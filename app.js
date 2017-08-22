document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
	var issueDesc = document.getElementById('issueDescInput').value,
			issueSeverity = document.getElementById('issueSeverityInput').value,
			assignedTo = document.getElementById('issueAssignedToInput').value;
	
	e.preventDefault();
	
	console.log(issueDesc,issueSeverity,assignedTo);
}

function fetchIssues() {
	"use strict";
	var	issues = JSON.parse(localStorage.getItem('issues')),
			issueList = document.getElementById('issueList');
	
	issueList.innerHTML = '';
	
	for(var i = 0; i < issues.length; i++) {
		var id = issues[i].id,
				desc = issues[i].description,
				severity = issues[i].severity,
				assignedTo = issues[i].assignedTo,
				status = issues[i].status;
		
		issueList.innerHTML += '<div class="well">' +
													 '<h6>Issue ID:' + id + '</h6>' +
													 '<p><span class="label label-info">' + status + '</p>' +
													 '<h3>' + desc + '</h3>' +
													 '<p><span class="glyphicon glyphicon-time"></span>' + severity + '</p>' +
													 '<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' +
													 '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>' +
													 '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' +
													 '</div>';
	}
}

