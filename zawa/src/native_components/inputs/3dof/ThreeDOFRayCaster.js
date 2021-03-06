/**
 * The examples provided by Oculus are for non-commercial testing and
 * evaluation purposes only.
 *
 * Oculus reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * OCULUS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as THREE from 'three';
// import { MeshLine, MeshLineMaterial  } from 'three.meshline';
import { RayCaster } from 'ovrui';
import { cameraMove } from '../../../components/Camera/move';

const LEFT_ORIGIN = [-0.3, 0, -0.3];
const RIGHT_ORIGIN = [0.3, 0, -0.3];
const GAMEPAD_HEIGHT = 4;


const blueButtonColor = new THREE.Color('#2b87ca');
const yellowButtonColor = new THREE.Color('#ede81f');
/**
 * Create the gradient material for the beam emitting from the controller
 */
function createFadeMaterial() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 32;
  const cx = canvas.getContext('2d');
  const gradient = cx.createLinearGradient(0, 0, 1024, 0);
  gradient.addColorStop(0, 'rgba(0, 255, 255, 0)');
  gradient.addColorStop(1, 'rgba(0, 255, 255, 0.9)');
  cx.fillStyle = gradient;
  cx.fillRect(0, 0, 1024, 32);
  // cx.lineWidth = 10;
  // cx.strokeStyle = 'rgba(255, 0, 255, 1)';
  // cx.moveTo(0, 0);
  // cx.bezierCurveTo(0, 0, 512, 16, 1024, 32);
  // cx.stroke();
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  const fadeMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
  });
  return fadeMaterial;
}

function createBeamLineMesh() {
  const beamGeom = new THREE.Geometry(); //光束
    beamGeom.vertices.push(
      new THREE.Vector3(-0.01, 0.01, 0),
      new THREE.Vector3(0.01, 0.01, 0),
      new THREE.Vector3(0.001, 0.001, -1),
      new THREE.Vector3(-0.001, 0.001, -1),

      new THREE.Vector3(-0.01, -0.01, 0),
      new THREE.Vector3(0.01, -0.01, 0),
      new THREE.Vector3(0.001, -0.001, -1),
      new THREE.Vector3(-0.001, -0.001, -1),
    );
    beamGeom.faces.push(
      new THREE.Face3(0, 1, 3),
      new THREE.Face3(1, 2, 3),
      new THREE.Face3(1, 5, 2),
      new THREE.Face3(5, 6, 2),
      new THREE.Face3(5, 4, 6),
      new THREE.Face3(4, 7, 6),
      new THREE.Face3(4, 0, 7),
      new THREE.Face3(0, 3, 7),
    );
    const uvs = [
      new THREE.Vector2(0, 1),
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1, 0),
      new THREE.Vector2(1, 1),
    ];
    beamGeom.faceVertexUvs[0][0] = [uvs[0], uvs[1], uvs[3]];
    beamGeom.faceVertexUvs[0][1] = [uvs[1], uvs[2], uvs[3]];
    beamGeom.faceVertexUvs[0][2] = [uvs[0], uvs[1], uvs[3]];
    beamGeom.faceVertexUvs[0][3] = [uvs[1], uvs[2], uvs[3]];
    beamGeom.faceVertexUvs[0][4] = [uvs[0], uvs[1], uvs[3]];
    beamGeom.faceVertexUvs[0][5] = [uvs[1], uvs[2], uvs[3]];
    beamGeom.faceVertexUvs[0][6] = [uvs[0], uvs[1], uvs[3]];
    beamGeom.faceVertexUvs[0][7] = [uvs[1], uvs[2], uvs[3]];
    beamGeom.verticesNeedUpdate = true;
    beamGeom.elementsNeedUpdate = true;
    const beam_line = new THREE.Mesh(
      beamGeom,
      createFadeMaterial()
    );
    return beam_line;
}

function updateCurveMeshGeometry(controller, angle, vector) {

  var curvePoints = [];
  if(controller && angle && vector) {
    var startPoint = new THREE.Vector3();
    controller.getWorldPosition(startPoint);
    var maxDistance = 20;

    const distance = ( angle + 1.3 ) / 4 * maxDistance;
    var startToEnd = vector.clone().multiplyScalar(distance);
    const endPoint = startPoint.clone().add(startToEnd);
    endPoint.y = 1.1;
    const middlePoint = startPoint.clone().add(startToEnd.divideScalar(2));

    curvePoints.push(startPoint);
    curvePoints.push(middlePoint);
    curvePoints.push(endPoint);  
  }

  var pointsArray = curvePoints.length > 0 ? curvePoints : [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(0, -1, -2),
  ];

  const spline = new THREE.CatmullRomCurve3(pointsArray);

  const points = spline.getPoints(25);
  const geometry = new THREE.Geometry();
  geometry.vertices = points;
  return geometry;
}

function createBeamCurveMesh(controller, angle, vector) {
 
  var geometry = updateCurveMeshGeometry(controller, angle, vector);
  const material = new THREE.LineDashedMaterial( { 
    color: 0xffff00,
  } );

  const beam_curve = new THREE.Line( geometry, material ); 
  return beam_curve;
}

/**
 * ThreeDOFRayCaster implements a laser pointer-like input device for any
 * gamepad input with a pose.
 */
export default class ThreeDOFRayCaster extends RayCaster {
  constructor(scene) {
    super();
    this._scene = scene;
    this._active = true;
    this._gamepadIndex = -1;
    this._createController();
    this._vector = new THREE.Vector3();
    this._controllerQuaternion = new THREE.Quaternion();
    this._cameraQuaternion = new THREE.Quaternion();
    this._gamepadPosition = new THREE.Vector3();
    this._cameraPosition = new THREE.Vector3(0, 0, 0);

    const initialGamepads = navigator.getGamepads();
    let i = 0;
    while (i < initialGamepads.length && this._gamepadIndex < 0) {
      const gamepad = initialGamepads[i];
      if (gamepad && gamepad.pose) {
        this._setUpGamepad(gamepad);
      }
      i++;
    }

    window.addEventListener('gamepadconnected', (e) => {
      if (this._gamepadIndex < 0 && e.gamepad.pose) {
        this._setUpGamepad(e.gamepad);
      }
    });

    window.addEventListener('gamepaddisconnected', (e) => {
      if (this._gamepadIndex === e.gamepad.index) {
        this._scene.remove(this._mesh);
        this._gamepadIndex = -1;
        this._active = false;
      }
    });
  }
  //get gamepad in use currently
  _getGamepad() {
    const gamepads = navigator.getGamepads();
    return gamepads[this._gamepadIndex];
  }

  _setUpGamepad(gamepad) {
    this._gamepadIndex = gamepad.index;
    this._scene.add(this._mesh);
    this._scene.add(this._teleport);
    this._active = true;
    this._gamepadPosition = gamepad.pose.position;
    if (gamepad.hand === 'left') {
      this._origin = LEFT_ORIGIN;
      this._mesh.position.set(this._gamepadPosition[0], this._gamepadPosition[1] + GAMEPAD_HEIGHT, this._gamepadPosition[2]);
    } else {
      this._origin = RIGHT_ORIGIN;
      this._mesh.position.set(this._gamepadPosition[0], this._gamepadPosition[1] + GAMEPAD_HEIGHT, this._gamepadPosition[2]);
    }
  }

  _setUpCameraNewPosition(position) {
    this._cameraPosition = position;
  }

  _getCameraNewPosition() {
    return this._cameraPosition;
  }
  
  _createController() {
    if (this._mesh) {
      return;
    }
    if (this._teleport) {
      return;
    }

    const beamLine = createBeamLineMesh();
    const beamCurve = createBeamCurveMesh();
    const wand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.02, 0.2, 16),
      new THREE.MeshBasicMaterial({color: '#000000'})
    );
    
    wand.rotation.x = -Math.PI / 2;
    wand.position.z = 0.1;
    const button = new THREE.Mesh(
      new THREE.CylinderGeometry(0.01, 0.01, 0.01, 16),
      new THREE.MeshBasicMaterial({color: blueButtonColor})
    );
    button.position.y = 0.025;
    button.position.z = 0.04;
    this._controllerButton = button;

    const controller = new THREE.Object3D();
    controller.add(beamLine);
    // controller.add(beamCurve);
    controller.add(wand);
    controller.add(button);
    this._mesh = controller;

    // teleport
    const beamCircleInner = new THREE.Mesh( 
      new THREE.RingBufferGeometry( 0.3, 0.35, 32 ), 
      new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } ) 
    );

    const beamCircleOuter = new THREE.Mesh( 
      new THREE.RingBufferGeometry( 0.5, 0.55, 32 ), 
      new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } ) 
    );

    const beamCircle = new THREE.Object3D();
    beamCircle.add(beamCircleInner);
    beamCircle.add(beamCircleOuter);
    
    beamCircle.rotation.x = - Math.PI / 2;
    const teleport = new THREE.Object3D();
    teleport.add(beamCurve);
    teleport.add(beamCircle);
    this._teleport = teleport;

    // temp
    window.mesh = this._mesh;
    window.teleport = this._teleport;
  }
  // 当button2按下时采用曲线光束，否则采用默认光束
 _changeController(gamepad, angle) {
    if (gamepad && gamepad.pose) {
      if (gamepad.buttons[2].pressed) {
        const vector = this.getRayVector();
        const beamCurve = createBeamCurveMesh(this._mesh, angle, vector);
        const endPointPosition = beamCurve.geometry.vertices[beamCurve.geometry.vertices.length - 1];

        beamCurve.parent = this._teleport;
        this._teleport.children[0] = beamCurve;
        this._teleport.children[1].position.copy(endPointPosition);

        this._mesh.children[0].visible = false;
        this._teleport.visible = true;
       
        if (gamepad.buttons[1].pressed) {
          this._setUpCameraNewPosition(endPointPosition);
        }
      } else {
        this._mesh.children[0].visible = true;
        this._teleport.visible = false;
      }
    }
  }

  // Begin RayCaster implementation details
  getType() {
    return '3dof';
  }

  _clickButton(gamepad) {
    if (gamepad.buttons[0] && typeof gamepad.buttons[0] === 'object') {
      if (gamepad.buttons[0].pressed) {
        this._controllerButton.position.y = 0.02;
        this._controllerButton.material.color = yellowButtonColor;
      } else {
        this._controllerButton.position.y = 0.025;
        this._controllerButton.material.color = blueButtonColor;
      }
    }
  }

  /**
   * Each frame, update the rendered controller in VR space to match the latest
   * orientation data from the gamepad.
   */
  frame() {
    if (!this._active) {
      return;
    }
    const gamepad = this._getGamepad();
    var angle = this._getRayAngle();
    this._changeController(gamepad, angle);  // update controller type

    // follow orientation of gamepad
    if (gamepad && gamepad.pose && gamepad.pose.orientation) {
      const orientation = gamepad.pose.orientation;
      this._mesh.quaternion.set(orientation[0], orientation[1], orientation[2], orientation[3]);
      this._clickButton(gamepad);
    }
    // follow position of gamepad
    if (gamepad && gamepad.pose && gamepad.pose.position) {
      const gamepadPosition = gamepad.pose.position;
      if (!gamepad.buttons[1].pressed) {
        this._mesh.position.set(
          this._cameraPosition.x + gamepadPosition[0], 
          gamepadPosition[1] + GAMEPAD_HEIGHT, 
          this._cameraPosition.z + gamepadPosition[2]
        );
      }
      this._gamepadPosition = gamepadPosition;
    }
  }

  /**
   * Return an array containing the x,y,z coordinates of the controller, which
   * is used as the starting point for casting the ray.
   */
  getRayOrigin() {
    if (!this._active) {
      return null;
    }
    return this._origin;
  }

  _getRayAngle() {
    if (!this._active || this._gamepadIndex < 0) {
      return null;
    }
    const vec_parent = new THREE.Vector3();
    const vec_child = new THREE.Vector3();
    this._mesh.getWorldPosition(vec_parent);
    this._mesh.children[2].getWorldPosition(vec_child);
   
    var vectorRay = vec_parent.sub(vec_child);
    var vectorUp = new THREE.Vector3(0, 1, 0);
    var angle = vectorUp.angleTo(vectorRay);
    return Math.PI / 2 - angle;
  }

  getRayVector() {
    if (!this._active || this._gamepadIndex < 0) {
      return null;
    }
    const vec_parent = new THREE.Vector3();
    const vec_child = new THREE.Vector3();
    this._mesh.getWorldPosition(vec_parent);
    this._mesh.children[1].getWorldPosition(vec_child);
    var vectorRay = vec_parent.sub(vec_child);

    return vectorRay.normalize();
  }

  /**
   * Return an array containing the vector components of the controller's
   * current orientation, which is used as the direction of the ray.
   * Since the controller rotation is not relative to the camera, we multiply
   * by the inverse of the camera's quaternion.
   */
  getRayDirection(camera) {
    if (!this._active || this._gamepadIndex < 0) {
      return null;
    }
    const gamepad = this._getGamepad();
    if (gamepad && gamepad.pose && gamepad.pose.orientation) {
      // Rotate <0, 0, -1> by the controller pose quaternion
      this._vector.set(0, 0, -1);
      const orientation = gamepad.pose.orientation;
      this._controllerQuaternion.set(orientation[0], orientation[1], orientation[2], orientation[3]);
      this._cameraQuaternion.copy(camera.quaternion);
      this._cameraQuaternion.inverse();

      this._vector.applyQuaternion(this._controllerQuaternion);
      this._vector.applyQuaternion(this._cameraQuaternion);
      return [this._vector.x, this._vector.y, this._vector.z];
    }
  }

  drawsCursor() {
    return true;
  }
}
