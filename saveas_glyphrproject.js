//	-------------------------
//	Save GLYPHR JSON
//	-------------------------

function triggerProjectFileDownload(){
		//JSON CONVERSION!!!!!!
		//var output = generateGlyphrProjectJS();
		var output = niceJSON(JSON.stringify(GlyphrProject));

		// Update the textbox
		//document.getElementById("genoutput").value = output;
		/*
		document.getElementById("genoutput").select();
		CopiedTxt = document.selection.createRange();
		CopiedTxt.execCommand("Copy");
		*/
		var link = document.createElement('a');
		link.href = 'data:text/plain,' + JSON.stringify(GlyphrProject);
		//link.download = (new Date()).getTime().toString(36) + '.txt';
		var d = new Date();
		var yr = d.getFullYear();
		var mo = d.getMonth()+1;
		var day = d.getDate();
		var hr = d.getHours();
		var min = (d.getMinutes()<10? "0" : "") + d.getMinutes();
		var sec = (d.getSeconds()<10? "0" : "") + d.getSeconds();
		
		link.download = GlyphrProject.fontmetadata.familyname + " - Glyphr Project - "+yr+"."+mo+"."+day+"."+hr+"."+min+"."+sec+".txt";
		link.click();
	}

	function niceJSON (pj) {
		var tchar; 
		var tab = 0;
		var nj = "";

		function tabs() {
			for(var t=0; t<tab; t++) nj += "\t";
		}

		for (var curr = 0; curr < pj.length; curr++) {
			if(pj.substr(curr, 3) === '"{"'){
				nj += '"{"';
				curr += 3;
			} else if (pj.substr(curr, 3) === '"}"'){
				nj += '"}"';
				curr += 3;
			} else if(pj.substr(curr, 3) === '"["'){
				nj += '"["';
				curr += 3;
			} else if (pj.substr(curr, 3) === '"]"'){
				nj += '"]"';
				curr += 3;
			} else if (pj.substr(curr, 2) === '[]'){
				nj += '[]';
				curr ++;
			} else {
				tchar = pj.substr(curr, 1);
				
				if(tchar === "{"){
					nj += "\n"
					tabs();
					nj += "{\n";
					tab++;
					tabs();

				} else if(tchar === "["){
					nj += "\n"
					tabs();
					nj += "[\n";
					tab++;
					tabs();

				} else if(tchar === "}"){
					tab--;
					nj += "\n";
					tabs();	
					nj += "}";
					if(pj.substr(curr+1, 1) === ","){
						nj += ",";
						curr++;
					}
				
				} else if(tchar === "]"){
					tab--;
					nj += "\n";
					tabs();	
					nj += "]";
					if(pj.substr(curr+1, 1) === ","){
						nj += ",";
						curr++;
					}
									
				} else {
					nj += tchar;
				}
			}
		}

		return pj + "\n\n\n" + nj;
	}