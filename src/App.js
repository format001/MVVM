/**
 * MVC -> 驱动被MVC分离成三部分
 * 跟我们普通M V的逻辑混合在一起了
 *
 * MVVM -> 驱动VM -> ViewModel
 * M -> Model 数据保存和处理的层
 * V -> 视图
 */

import {useDOM, useReactive} from '../MVVM';

const data = useReactive({
    name: 'messi',
    age: 34,
    info: {
        job: 'teacher',
        students: [
            {
                id: 1,
                name: '小张'
            },
            {
                id: 2,
                name: '小王'
            },
            {
                id: 3,
                name: '小李'
            },
        ]
    },
    hobbies: ['piano', 'travel', 'film']
})

// console.log(data)


function App () {

    const state = useReactive({
        count: 0,
        name: '小李',
    });

    const add = (num) => {
        state.count += num;
    }

    const minus = (num) => {
        state.count -= num;
    }

    const changeName = (name) => {
        state.name = name;
    }

    return {
        template: `
          <h1>{{ count }}</h1>
          <h2>{{ name }}</h2>
          <button onClick="add(2)">+</button>
          <button onClick="minus(1)">-</button>
          <button onClick="changeName('lionel messi')">Change Name</button>
        `,
        state,
        methods: {
            add,
            minus,
            changeName
        }
    }
}

useDOM(
    App(), // template, state, methods
    document.getElementById('app')
)





function deepClone (origin, hashMap = new WeakMap) {
    if (origin == null || typeof origin !== 'object'){
        return origin
    }

    if (origin instanceof Date){
        return new Date(origin)
    }

    if (origin instanceof RegExp){
        return new RegExp(origin)
    }

    if (hashMap.get(origin)){
        return origin
    }

    let target = new origin.constructor();
    hashMap.set(origin, target)
    for (let key in origin) {
        if (origin.hasOwnProperty(key)){
            target[key] = deepClone(origin[key], hashMap);
        }
    }
    return target;
}


var data1 = {
        a: 'a',
    },
    data2 = {
        b: 'b',
    };
data1.data2 = data2;
data2.data1 = data1;

var data3 = deepClone(data1);







