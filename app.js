document.getElementById('issueInputForm').addEventListener('submit',saveIssue);
function saveIssue(e){
	// e.preventDefault();
	var issueId = chance.guid();
	 console.log(issueId)
	var issueDesc = document.getElementById('issueDescInput').value;
	 console.log(issueDesc)
	var issueSeverity = document.getElementById('issueSeverityInput').value;
		 console.log(issueSeverity)
	var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
	 // console.log(issueAssignedTo)
	var issueStatus = 'Open';
	var issue = {
		id : issueId,
		description : issueDesc,
		severity :issueSeverity,
		assignedTo: issueAssignedTo,
		status : issueStatus
	}
	 // console.log(issue,'hii issue');
	if(localStorage.getItem(issues) == null){
		var issues=[];
		issues.push(issue);
		  console.log(issues,'hi if block');
		localStorage.setItem("issues",JSON.stringify(issues))

	}else{
		var issues =JSON.parse(localStorage.getItem("issues"));
		issues.push(issue)
		 console.log(issues,'hi else block')
		localStorage.setItem("issues",JSON.stringify(issues));  
	}
	document.getElementById('issueInputForm').reset();
	fetchIssues();
	e.preventDefault();
}
	function setStatusClosed(id,e){
		var issues = JSON.parse(localStorage.getItem('issues'))
		for(var i=0; i<issues.length; i++){
			if(issues[i].id == id){
				issues[i].status = "Closed";
				console.log(status,'hi status');
			}
		}
		localStorage.setItem('issues',JSON.stringify(issues))
			fetchIssues();

	}
	function deleteIssue(id,e){
		var issues = JSON.parse(localStorage.getItem('issues'))
		for(var i=0; i<issues.length; i++){
			if(issues[i].id == id){
				issues.splice(i,1);
			}
		}
		localStorage.setItem('issues',JSON.stringify(issues))
		// e.preventDefault();
			fetchIssues();

	}

function fetchIssues()	{

	var issues = JSON.parse(localStorage.getItem('issues'));
	//alert(issues)
	console.log(issues,'hi fetch issue');
	var issueList  = document.getElementById("issuesList");
	 console.log(issueList,'issue list')
	issueList.innerHTML = '';
	for(var i= 0; i<issues.length; i++){
		var id = issues[i].id;
		//console.log(id,'id');
		var desc= issues[i].description;
		//console.log(desc,'description');
		var severity = issues[i].severity;
		//console.log(severity,'severity');
		var assignedTo = issues[i].assignedTo
		//console.log(assignedTo ,'assignedTo')
		var status = issues[i].status
		//console.log(status,'status');
		issueList.innerHTML  += '<div class="well">'+
								'<h6> Issue Id: ' + id + '</h6>' +
								'<p><span class="badge badge-info">'+ status +
								'</span></p>' + '<h3> Description: ' + desc + '</h3>' +
								'<p><i class="fa fa-clock-o" aria-hidden="true"></i>' +'&nbsp' + 
								severity  + '<i class="fa fa-user" aria-hidden="true"></i>'+'&nbsp' +  assignedTo + '</p>' + '<a href="#" class="btn btn-outline-info"  onclick="setStatusClosed(\''+id+'\')">Close</a>' +
      					'<a href="#" class="btn btn-outline-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
        '</div>';
	}
}