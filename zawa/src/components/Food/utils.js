/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-23 23:08:39 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-04-25 23:04:58
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
  const rand = Math.random() * FOOD_COUNT;
  return {
    obj: `${Food.prefix}${Food.name[rand]}.obj`,
    mtl: `${Food.prefix}${Food.name[rand]}.mtl`,
  }
}

function initPosition() {
  return [
    Math.random() * 100 - 100 / 2,
    Math.random() * 15 + 5,
    Math.random() * 100 - 100 / 2,
  ];
}

function initOrientation() {
  return [
    Math.random() * 360,
    Math.random() * 360,
    Math.random() * 360,
  ];
}

export default {
  getFoodUrl,
  initPosition,
  initOrientation,
}