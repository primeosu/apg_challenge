<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/chartist.min.css">
	<link rel="stylesheet" href="css/style.css">
	<script src = "js/plugins/jquery-1.11.1.min.js"></script>
	<script src = "js/plugins/angular.min.js"></script>
	<script src = "js/plugins/bootstrap.min.js"></script>
	<script src = "js/plugins/chartist.min.js"></script>
	<script src = "js/InputCtrl.js"></script>
</head>
<body>
	<div ng-app="inputApp" ng-controller="InputCtrl as input" class = "content">
		<div class = "row">
			<div class = "col-md-3">
			</div>
			<div class = "col-md-6">
				<div class="panel panel-default panel-top">
					<div class="panel-body">
						<h4>Please select .csv file for upload</h4>
						<form ng-show = "input.progress === 100" action="/Challenge/challenge/rest/upload/" enctype="multipart/form-data" method="post" id="fileInfo" name="fileInfo">
							<div class = "upload-input">
								<input id="fileSelect" type="file" name="file" accept=".csv" required />  
								<input ng-disabled="fileInfo.$invalid" class = "btn btn-primary btn-upload" type="submit" value="Upload">
							</div>
						</form>
						<div ng-hide = "input.progress === 100">
							<div class="progress">
							  <div class="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" aria-valuenow="input.progress" aria-valuemin="0" aria-valuemax="100" style="width: {{input.progress}}%">
							    <div class = "progress-text">{{input.progress}}%</div>
							  </div>
							</div>
							<span>{{input.message}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class = "col-md-3">
			</div>
			<div class = "row" ng-if = "input.data != 'empty'">
				<div class = "col-md-6">
					<div class="panel panel-default panel-quadrant">
						<div class="panel-heading summary-heading">
							<h3 class="panel-title">Classification Types</h3>
						</div>
						<div class="panel-body">
							<div ng-repeat = "name in input.data.summary_names track by $index">
								<h4>{{name}}</h4>
								<div class="progress">
									<div class="progress-bar" role="progressbar" aria-valuenow="{{input.data.summary_values[$index] / input.data.summary_max * 100}}" aria-valuemin="0" aria-valuemax="100" style = "width: {{input.data.summary_values[$index] / input.data.summary_max * 100}}%; background-color: {{input.colors[$index % 6]}}">
										<div class = "progress-text">{{input.data.summary_values[$index]}}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class = "col-md-6">
					<div class="panel panel-default panel-quadrant">
						<div class="panel-heading table-heading">
							<h3 class="panel-title">Table</h3>
						</div>
						<div class="panel-body">
							<table class="table table-bordered table-striped">
								<thead>
									<tr>
										<th>Md5</th>
										<th>Classification Name</th>
										<th>Classification Type</th>
										<th>Size</th>
										<th>File Type</th>
									</tr>
								</thead>
								<tbody>
									<tr ng-repeat = "row in input.data.table track by $index">
										<td>{{row.md5}}</td>
										<td>{{row.cname}}</td>
										<td>{{row.ctype}}</td>
										<td>{{row.size}}</td>
										<td>{{row.ftype}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div class = "row" ng-show = "input.data != 'empty'">
				<div class = "col-md-6">
					<div class="panel panel-default panel-quadrant">
						<div class="panel-heading bar-heading">
							<h3 class="panel-title">Classification Names</h3>
						</div>
						<div class="panel-body">
							<div class="bar ct-golden-section"></div>
						</div>
					</div>
				</div>
				<div class = "col-md-6">
					<div class="panel panel-default panel-quadrant">
						<div class="panel-heading pie-heading">
							<h3 class="panel-title">File Types</h3>
						</div>
						<div class="panel-body">
							<div class="pie ct-golden-section"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
	</html>
