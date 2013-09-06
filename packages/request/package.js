console.log('/packages/request/package.js');

Package.describe({
	summary: 'Request node package from Mikeal for http request system',
        environments: ['server']
});

Npm.depends({request: '2.21.0'});

Package.on_use(function (api) {
	api.add_files('./request.js', 'server');
});
