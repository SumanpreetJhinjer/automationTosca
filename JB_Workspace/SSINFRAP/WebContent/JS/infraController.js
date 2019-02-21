var InfraApp = angular.module('InfraModule', [ '720kb.datepicker' ]);

InfraApp
		.controller(
				'infraRequestController',
				[
						'$http',
						'$rootScope',
						'$scope',
						'$interval',
						function($http, $rootScope, $scope, $interval) {

							$scope.loading = true;
							$scope.showRequest = true;

							Date.prototype.addDays = function(days) {
								this.setDate(this.getDate() + parseInt(days));
								return this;
							};

							$scope.preventDefault = function(e) {
								e.preventDefault();
							}

							let date = new Date();

							$scope.minDate = date.toDateString();
							$scope.maxStartDate = date.addDays(4)
									.toDateString();
							$scope.maxDateSelectDisabled = true;
							$scope.setEndDate = function(Startdate) {
								$scope.maxDateSelectDisabled = false;
								var parseDate = Startdate.split('-');
								console.log("parseDate ", parseDate);
								let endDate = new Date(parseDate[2],
										parseDate[1] - 1, parseDate[0])

								$scope.minEndDate = endDate.toDateString();
								$scope.maxEndDate = endDate.addDays(185)
										.toDateString();
							}

							
							infraRouter.getEnvName($scope, $http);
							infraRouter.getAppName($scope, $http);
							// infraRouter.getTypeName($scope, $http);
							// infraRouter.getEnvType($scope,
							// $http,$scope.environment);
							var environment = document
									.getElementById("environment");
							var appname = document.getElementById("appname");
							var hostname = document.getElementById("hostname");
							var type = document.getElementById("type");
							var installDriveSelected = document
									.getElementById("installDriveSelected");
							var otherDriveSelected = document
									.getElementById("otherDriveSelected");
							var emailID = document.getElementById("emailID");
							var osSelected = document
									.getElementById("osSelected");
							var version = document.getElementById("version");
							var userID = document.getElementById("userID");
							var appmgremailID = document
									.getElementById("appmgremailID");
							
							$scope.getEnvType = function() {
								const parameters = {
										envselected : environment.value,
										appnameselected : appname.value,
										hostnameselected : hostname.value,
										typeselected : type.value,
										installDriveselected : installDriveSelected.value,
										otherDriveSelected : otherDriveSelected.value,
										emailIDselected : emailID.value,
										osSelectedselected : osSelected.value,

									}

								$scope.selectedFilter = false;
								$scope.envError = false;
								$scope.envTypeError = false;
								infraRouter.getEnvType($scope, $http,
										parameters);
							}
							$scope.getOStype = function() {
								const parameters = {
										envselected : environment.value,
										appnameselected : appname.value,
										hostnameselected : hostname.value,
										typeselected : type.value,
										installDriveselected : installDriveSelected.value,
										otherDriveSelected : otherDriveSelected.value,
										emailIDselected : emailID.value,
										osSelectedselected : osSelected.value,

									}

								$scope.selectedFilter = false;
								infraRouter.getOStype($scope, $http,
										parameters);
							}

							$scope.getotherAppName = function() {
								const parameters = {
										envselected : environment.value,
										appnameselected : appname.value,
										hostnameselected : hostname.value,
										typeselected : type.value,
										installDriveselected : installDriveSelected.value,
										otherDriveSelected : otherDriveSelected.value,
										emailIDselected : emailID.value,
										osSelectedselected : osSelected.value,

									}

								$scope.selectedFilter = false;
								$scope.appnameError = false;
								infraRouter.getotherAppName($scope, $http,
										parameters);
							}

							

							$scope.init = function() {
								$scope.showResultConfirmation = false;
								$scope.showInstallationStatus = false;
								$scope.showRequest = true;
								$scope.showStep1 = true;
								$scope.showStep2 = false;
								$scope.showStep3 = false;
								$scope.isDisabled2 = true;
								$scope.isDisabled3 = true;

							};

							$scope.SubmitInstalationResquest = function() {
								let userID = document.getElementById("userID").value;
								let EmailProvided = document
										.getElementById("emailID").value;
								var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
								let appnamePattern = new RegExp("[A-Z]");
								let emailPattern = new RegExp(
										"@team.telstra.com$")
								let appname = document
										.getElementById("appname");
								let poID = document
										.getElementById("appmgremailID").value;
								if ($('#appname').val() == 'OtherApp') {
									let otherappname = document
											.getElementById("newAppName").value;
									$scope.appnameError = false;
									$scope.otherappname = otherappname
											.toUpperCase();
									$scope.appname = otherappname.toUpperCase();
								} else if (appname.value != null
										&& appname.value != "") {
									$scope.appnameError = false;
									$scope.appname = appname.value;
								} else
									$scope.appnameError = true;
								if (pattern.test(userID)) {
									$scope.userIDError = false;
									$scope.userID = userID;

								} else
									$scope.userIDError = true;

								if (pattern.test(EmailProvided)) {
									$scope.emailIDError = false;
									$scope.EmailProvided = EmailProvided;
								} else
									$scope.emailIDError = true;

								if (emailPattern.test(poID)) {
									$scope.poIDError = false;
									$scope.poID = poID;
								} else
									$scope.poIDError = true;

								let hostname = document
										.getElementById("hostname");
								if (hostname.value != null
										&& hostname.value != "") {
									$scope.hostnameError = false;
									$scope.hostname = hostname.value;
								} else
									$scope.hostnameError = true;

								let environment = document
										.getElementById("environment");
								if ($('#environment').val() == 'OtherEnv') {
									let newEnvName = document
											.getElementById("newEnvName").value;
									$scope.envError = false;
									$scope.newEnvName = newEnvName
											.toUpperCase();
									$scope.environment = newEnvName
											.toUpperCase();
									;
								} else if (environment.value != null
										&& environment.value != "") {
									$scope.envError = false;
									$scope.environment = environment.value;
								} else
									$scope.envError = true;

								let type = document.getElementById("type");
								
								
								if ($('#type').val() == 'OtherType') {
									let newEnvType = document
											.getElementById("newEnvTypeName").value;
									$scope.envTypeError = false;
									$scope.newEnvType = newEnvType
											.toUpperCase();
									$scope.type = newEnvType
											.toUpperCase();
									;
								} else if (type.value != null && type.value != "") {
									$scope.envTypeError = false;
									$scope.type = type.value;
								} else $scope.envTypeError = true;

								let installDrive = document
										.getElementById("installDriveSelected");
								if (installDrive.value != null
										&& installDrive.value != "") {
									$scope.installDriveError = false;
									$scope.installDrive = installDrive.value;
								} else
									$scope.installDriveError = true;
								let otherDrive = document
										.getElementById("otherDriveSelected");
								if (otherDrive.value != null
										&& otherDrive.value != "") {
									$scope.otherdriveError = false;
									$scope.otherDrive = otherDrive.value;
								} else
									$scope.otherdriveError = true;

								let osSelect = document
										.getElementById("osSelected");
								if (osSelect.value != null
										&& osSelect.value != "") {
									$scope.osSelectedError = false;
									$scope.osSelect = osSelect.value;
									if($('#osSelected').val() == 'Cloud'){
										$scope.oracleSIDError = false;
										$scope.owningIDError = false;
										$scope.groupIdError = false;
										$scope.secondaryEmailIDError = false;
										$scope.givenNameError = false;
										$scope.surNameError = false;
										$scope.mobileNumberError = false;
									}else{
										let oracleSID = document
										.getElementById("oracleSID");
										if (oracleSID.value != null
												&& oracleSID.value != "") {
											$scope.oracleSIDError = false;
											$scope.oracleSID = oracleSID.value;
										}else {$scope.oracleSIDError = true;}
										
										let owningID = document
										.getElementById("owningID");
										if (owningID.value != null
												&& owningID.value != "") {
											$scope.owningIDError = false;
											$scope.owningID = owningID.value;
										}else {$scope.owningIDError = true;}
										let groupId = document
										.getElementById("groupId");
										if (groupId.value != null
												&& groupId.value != "") {
											$scope.groupIdError = false;
											$scope.groupId = groupId.value;
										}else $scope.groupIdError = false;
										let secondaryEmailID = document
										.getElementById("secondaryEmailID");
										if (secondaryEmailID.value != null
												&& secondaryEmailID.value != "") {
											$scope.secondaryEmailIDError = false;
											$scope.secondaryEmailID = secondaryEmailID.value;
										}else $scope.secondaryEmailIDError = true;
										let givenName = document
										.getElementById("givenName");
										if (givenName.value != null
												&& givenName.value != "") {
											$scope.givenNameError = false;
											$scope.givenName = givenName.value;
										}else $scope.givenNameError = true;
										let surName = document
										.getElementById("surName");
										if (surName.value != null
												&& surName.value != "") {
											$scope.surNameError = false;
											$scope.surName = surName.value;
										}else $scope.surNameError = true;
										let mobileNumber = document
										.getElementById("mobileNumber");
										if (mobileNumber.value != null
												&& mobileNumber.value != "") {
											$scope.mobileNumberError = false;
											$scope.mobileNumber = mobileNumber.value;
										}else $scope.mobileNumberError = false;
									}
								} else
									$scope.osSelectedError = true;

								let version = document
										.getElementById("version");
								if (version.value != null
										&& version.value != "") {
									$scope.versionError = false;
									$scope.version = version.value;
								} else
									$scope.versionError = true;
								if (!$scope.userIDError && !$scope.emailIDError
										&& !$scope.poIDError
										&& !$scope.hostnameError
										&& !$scope.envError
										&& !$scope.envTypeError
										&& !$scope.installDriveError
										&& !$scope.otherdriveError
										&& !$scope.osSelectedError
										&& !$scope.versionError
										&& !$scope.oracleSIDError
										&& !$scope.owningIDError
										&& !$scope.groupIdError
										&& !$scope.secondaryEmailIDError
										&& !$scope.givenNameError
										&& !$scope.surNameError
										&& !$scope.mobileNumberError) {
									const parameters = {
										environment : $scope.environment,
										appname : $scope.appname,
										hostname : $scope.hostname,
										type : $scope.type,
										installDrive : $scope.installDrive,
										otherDrive : $scope.otherDrive,
										emailID : $scope.EmailProvided,
										osSelect : $scope.osSelect,
										version : $scope.version,
										userID : $scope.userID,
										appmgremailID : $scope.poID,
										oracleSID:$scope.oracleSID,
										owningID:$scope.owningID,
										groupId:$scope.groupId,
										secondaryEmailID:$scope.secondaryEmailID,
										givenName:$scope.givenName,
										surName:$scope.surName,
										mobileNumber:$scope.mobileNumber,

									}

									infraRouter
											.updateCleanMachineRequestDetails(
													$scope, $http, parameters);

								} else {
								}
							};

							$scope.notRequired = true;
							$scope.selectedSoftware = false;

							$scope.switches = function(software, index) {
								$scope.selectedSoftware = true;
								$scope.notRequired = false;

							};
							$scope.reverseSwitches = function(software, index) {
								$scope.notRequired = true;
								$scope.selectedSoftware = false;

							};

						} ]);