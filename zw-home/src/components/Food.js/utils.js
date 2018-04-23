/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-23 23:08:39 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-04-23 23:54:57
 */
const Food = {
  prefix: 'models/food',
  name: [
    'cake',
    'donut',
    'egg',
    'icecream1',
    'icecream2',
    'icecream3',
    'lollipop1',
    'lollipop2',
    'makalong1',
    'makalong2',
    'makalong3',
    'makalong4',
    'makalong5',
    'makalong6',
    'makalong7',
    'makalong8',
    'makalong9',
    'sushi',  
  ],
}

function getFoodUrl() {
  const FOOD_COUNT = Food.name.length;
  const rand = console.log(Math.random() * FOOD_COUNT);
  return {
    obj: `${Food.prefix}${Food.name[rand]}.obj`,
    mtl: `${Food.prefix}${Food.name[rand]}.mtl`,
  }
}

function initPosition() {
  const x = Math.random() * 100 - 100 / 2;
  const z = Math.random() * 100 - 100 / 2;
  return {
    x,
    z,
  };
}

export default {
  getFoodUrl,
  initPosition,
}