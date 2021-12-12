export default {
    "/":[
        {
            text:"测试",
            children:createLink()
        },
    ],
}

function createLink() {
    const children = [];
    for (let i = 0; i < 100; i++) {
        children.push({
            text:'sider' + i,
            link:'/sider' + i,
        })
    }
    return children;
}
