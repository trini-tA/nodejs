(function() {

	var engine = {
		init : function() {
			$('document').ready(engine.main);
		},
		main : function() {
			$('#btInsert').click(engine.insert);
			$('#btSearch').click(engine.search);
		},
		insert : function() {
			var name = $('#name').val();
			var pname = $('#pname').val();
			var code = $('#code').val();

			/// console.log( name + ' ' + pname + ' ' + code );
			$.ajaxSetup({
				contentType: "application/json"
			});
			// { "_id" : 1234, "nom" : "toto", "prenom" : "titi", "code" : 100 }
			var donnees = {
				data : {
					nom : name,
					prenom : pname,
					code : code
				}
			};

			var comObj = $.post(
					'/services/insert',
					JSON.stringify(donnees),
					function(data) {
						console.log('services/insert----> '
								+ JSON.stringify(donnees));

					}, 'json').fail(function() {

				if (comObj.status == 405) {
					console.log('err no service exist !');
				} else {
					console.log('[err post] ' + comObj.status);
				}

			});

		},
		search : function() {
			var name = $('#name').val();
			var pname = $('#pname').val();
			var code = $('#code').val();

			/// console.log( name + ' ' + pname + ' ' + code );
			$.ajaxSetup({
				contentType: "application/json"
			});
			// { "_id" : 1234, "nom" : "toto", "prenom" : "titi", "code" : 100 }
			var donnees = {
				data : {
					nom : name,
					prenom : pname,
					code : code
				}
			};

			var comObj = $.post(
					'/services/search',
					JSON.stringify(donnees),
					function(data) {
						console.log('services/search----> '
								+ JSON.stringify(donnees));

					}, 'json').fail(function() {

				if (comObj.status == 405) {
					console.log('err no service exist !');
				} else {
					console.log('[err post] ' + comObj.status);
				}

			});

		},

	};

	engine.init();
})();
