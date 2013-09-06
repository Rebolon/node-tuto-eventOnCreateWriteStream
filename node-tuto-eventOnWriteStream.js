/**
 * Tuto sur l'utilisation de WriteStream (meteor n'est là que pour avoir un environnement node)
 * @reference : http://blog.safaribooksonline.com/2013/05/01/using-streams-in-node-js/
 * @reference : http://nodemanual.org/latest/nodejs_ref_guide/stream.html
 */

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    var counter = {open:0, drain:0, close:0, data:0, end:0, finish:0, error:0},
        url = 'http://www.google.fr/logos/doodles/2013/leonidas_da_silvas_100th_birthday-2024005-hp.jpg',
        filename = './testFile~',
        fs = Npm.require('fs'),
        writeStream = fs.createWriteStream(filename);

    // have a look at http://nodemanual.org/latest/nodejs_ref_guide/stream.html
    // to get info on available event for writeStream !
    // except that they forgot open event
    writeStream.on('open', function() {
      console.info('on open', counter.open++, arguments);
    })
    .on('drain', function() {
      console.info('on drain', counter.drain++, arguments);
    })
    .on('close', function() {
      console.info('on close', counter.close++, arguments);
    })
    .on('data', function() {
      console.info('on data', counter.data++, arguments);
    })
    .on('end', function() {
      console.log('on end', counter.end++, arguments);
    })
    .on('finish', function() {
      console.log('on finish', counter.finish++, arguments);
    })
    .on('error', function (err) {
      console.log('on error', counter.error++, arguments);
    });

    request(url)
      .pipe(writeStream);
  });
}
