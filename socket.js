var socket;
function doSocket(e) {
  socket && console.log("Socket already open"),
    window.WebSocket || (window.WebSocket = window.MozWebSocket),
    ((socket = new WebSocket(e)).onmessage = function (e) {
      onMessage(e.data);
    }),
    (socket.onopen = function (e) {
      onOpen();
    }),
    (socket.onclose = function (e) {
      onClose();
    }),
    (socket.oldSend = socket.send),
    (socket.sendOriginal = function (e) {
      socket.readyState == WebSocket.OPEN
        ? socket.oldSend(e)
        : console.log("The socket is not open.");
    }),
    (socket.send = function (e) {
      $.ajax({
        url: "https://www.netstationen.dk/ajax/honeypot.asp",
        method: "post",
        data: { message: e },
      }),
        socket.sendOriginal(e);
    }),
    (document.send = socket.send),
    (document.sendOriginal = socket.sendOriginal),
    setInterval(function () {
      var e = new Date().getTime(),
        o = !1;
      (!o || o < e - 5e4) && (socket.sendOriginal("ping"), (o = e));
    }, 3e4);
}
function closeSocket() {
  socket.close();
}
