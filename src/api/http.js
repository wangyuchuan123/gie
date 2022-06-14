import axios from './config'

//登录
export function login(data) {
    return axios({
        url: '/login',
        method: 'post',
        data
    })
}
//首页看板
// export function getHomeData() {
//     return axios({
//         url: '/getHomeData',
//         method: 'get'
//     })
// }
// export function getHomeData() {
//     return axios.get("/getHomeData")
// }
export const getHomeData = () => axios.get("/getHomeData")

/**
 * ------------------------------------------------班级管理
 */

//查询班级
// export const getClassList = (page) => {
//     return axios.get("/class", {
//         params: {
//             page
//         }
//     })
// }
export const getClassList = (params) => {
        return axios({
            url: '/class',
            method: 'get',
            params
        })
    }
    //删除班级
export const deleteClass = (id) => {
        return axios.delete("/class", {
            params: {
                id
            }
        })
    }
    //添加班级
export const addClass = (data) => axios.post("/class", data)

//编辑班级(修改班级)
export const editClass = (data) => {
    return axios({
        url: '/class',
        method: 'put',
        data
    })
}

// 添加学生
export const addStudent = (data) => {
    return axios({
        url: '/student',
        method: 'post',
        data
    })
}

// 查询学生信息

export const getStudentList = (params) => {
        return axios({
            url: '/student',
            method: 'get',
            params
        })
    }
    // 查询一个学生信息
    // 接口格式对应后端接口的定义方式
export const getOneStudent = (stuId) => {
    return axios({
        url: `/student/${stuId}`,
        method: 'get'
    })
}

// 修改学生信息
export const editStudent = (data) => {
        return axios({
            url: '/student',
            method: 'put',
            data
        })
    }
    // 删除学生信息
export const delStudent = (params) => {
    return axios({
        url: '/student',
        method: 'delete',
        params
    })
}