
export function socketMonitor (io){

    // //有用户加入
    // io.on("add user", (data) => store.dispatch(addUser(data.content)) );
    // //用户离开
    // io.on("user leave", (data) => store.dispatch(userLeave(data.content)) );
    // 接收消息
    io.on("new message", (data) => {
        //收到的新消息
        // const message = data.content;
        // //获取当前正在聊天的人
        // const current = store.getState().currentChatUser;
        // //如果发送消息的不是当前聊天的人, 触发未读action
        // if(message.from !== current._id){
        //     // store.dispatch(unread(message.from));
        // }
        //接收消息
        // store.dispatch(newMessage(message));
    });
}