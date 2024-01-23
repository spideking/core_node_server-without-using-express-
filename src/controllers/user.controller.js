function listeningToHomeRoute(_, res) {
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(
    JSON.stringify({
      statusCode: 200,
      messageBody: 'server IS working',
    }),
  );
}

function listeningToFriendRoutes(_, res) {
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(
    JSON.stringify({
      statusCode: 200,
      messageBody: 'Hear is list of all friends',
    }),
  );
}

function addingFriendToDataBases(req, res) {
  req.on('data', (data) => {
    console.log(data);
    console.log(data.toString());
  });

  req.pipe(res);
}

export {
  listeningToHomeRoute,
  listeningToFriendRoutes,
  addingFriendToDataBases,
};
