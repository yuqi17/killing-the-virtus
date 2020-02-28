import Socket from "socket.io-client";

const io = getSocket();

export default io;

/**
 * 建立 socket 连接. 返回连接后的对象
 * @returns {*}
 */
function getSocket(){
    const io = Socket(window.location.origin + '/chat',{
        reconnection : true,
        reconnectionDelay : 5000
    });

    io.on("connect", () => {
        console.log("socket. 连接成功");
    });

    require("./socketMonitor").socketMonitor(io);
    return io;
}