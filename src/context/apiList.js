export const developmentAPIs = {
  //Login Credentials
  login: "http://localhost/unmg_pms/api/signInUser.php",
  register: "http://localhost/unmg_pms/api/registerUser.php",
  updateUser: "http://localhost/unmg_pms/api/updateUser.php",

  //Admin Actions
  fetchDashboardData: "http://localhost/unmg_pms/api/fetchDashboardData.php",
  retrieveUsers: "http://localhost/unmg_pms/api/retrieveUsers.php",
  uploadBatchUsers: "http://localhost/unmg_pms/api/batchUpload.php",
  manageCompany: "http://localhost/unmg_pms/api/manageCompany.php",
  conglomerate: "http://localhost/unmg_pms/api/conglomerate.php",
  userActions: "http://localhost/unmg_pms/api/userActions.php",
  saveDate: "http://localhost/unmg_pms/api/saveDate.php",
  fetchOverview:"http://localhost/unmg_pms/api/fetchOverview.php",
  updateSettings:"http://localhost/unmg_pms/api/updateSettings.php",
  userSubmitKPIDuration: "http://localhost/unmg_pms/api/userSubmitKPIDuration.php",
  retrieveLogs:"http://localhost/unmg_pms/api/retrieveLogs.php",
  retrieveNotifications:"http://localhost/unmg_pms/api/retrieveNotifications.php",
  
  //Retrieval of Data
  fetchKPIDuration: "http://localhost/unmg_pms/api/fetchKpiDuration.php",
  fetchAllGoals: "http://localhost/unmg_pms/api/fetchAllGoals.php",
  retrieveDepartments: "http://localhost/unmg_pms/api/retrieveDepartments.php",
  retrieveCompanies: "http://localhost/unmg_pms/api/retrieveCompanies.php",
  retrievePillars: "http://localhost/unmg_pms/api/retrievePillars.php",
  retrieveTracking:"http://localhost/unmg_pms/api/retrieveTracking.php",
  retrieveTrackingScores:"http://localhost/unmg_pms/api/retrieveTrackingScores.php",
  retrieveKPIDescAndPillarPercentage: "http://localhost/unmg_pms/api/retrieveKpiDescAndPillarPercentage.php",
  retrieveEvaluation: "http://localhost/unmg_pms/api/retrieveEvaluation.php",
  retrieveTrackingEmployee: "http://localhost/unmg_pms/api/retrieveTrackingEmployee.php",
  retrieveSignOff: "http://localhost/unmg_pms/api/retrieveSignOff.php",
  retrieveSignOffEmployee: "http://localhost/unmg_pms/api/retrieveSignOffEmployee.php",
  getEmployeeGoals: "http://localhost/unmg_pms/api/getEmployeeGoals.php",
  retrieveGlobalSettings: "http://localhost/unmg_pms/api/retrieveGlobalSettings.php",
  retriveVerifyIfEvaluator: "http://localhost/unmg_pms/api/retriveVerifyIfEvaluator.php",
  
  retrieveReceivers: "http://localhost/unmg_pms/api/conversations/retrieveReceivers.php",
  retrieveConversations: "http://localhost/unmg_pms/api/conversations/retrieveConversations.php",
  retrieveConvo:"http://localhost/unmg_pms/api/conversations/retrieveConvo.php",
  
  //Submitting/Updating Data
  uploadProfilePicture: "http://localhost/unmg_pms/api/uploadImage.php",
  formCreation:"http://localhost/unmg_pms/api/formCreation.php",
  sendMail:"http://localhost/unmg_pms/api/sendmail.php",
  updateKPIDuration: "http://localhost/unmg_pms/api/updateKPIDuration.php",
  updateGoals:"http://localhost/unmg_pms/api/updateGoals.php",
  approveGoals: "http://localhost/unmg_pms/api/approveGoals.php",
  userSubmitAchievements:"http://localhost/unmg_pms/api/userSubmitAchievements.php",
  userSubmitTrackingEmployee: "http://localhost/unmg_pms/api/userSubmitTrackingEmployee.php",
  userSubmitApproval:"http://localhost/unmg_pms/api/userSubmitApproval.php",
  userSubmitSignOff:"http://localhost/unmg_pms/api/userSubmitSignOff.php",

  userSubmitNewConversation:"http://localhost/unmg_pms/api/conversations/userSubmitNewConversation.php",
  userSubmitDiscussion:"http://localhost/unmg_pms/api/conversations/userSubmitDiscussion.php",
  userSubmitNewMessage:"http://localhost/unmg_pms/api/conversations/userSubmitNewMessage.php",
  userDeleteConversation:"http://localhost/unmg_pms/api/conversations/userDeleteConversation.php",
};

export const releaseAPIs = {
  //Login Credentials
  login: "../api/signInUser.php",
  register: "../api/registerUser.php",
  updateUser: "../api/updateUser.php",
  
  //Admin Actions
  fetchDashboardData:"../api/fetchDashboardData.php",
  retrieveUsers: "../api/retrieveUsers.php",
  uploadBatchUsers: "../api/batchUpload.php",
  manageCompany: "../api/manageCompany.php",
  conglomerate: "../api/conglomerate.php",
  userActions: "../api/userActions.php",
  saveDate: "../api/saveDate.php",
  fetchOverview:"../api/fetchOverview.php",
  updateSettings:"../api/updateSettings.php",
  userSubmitKPIDuration: "../api/userSubmitKPIDuration.php",
  retrieveLogs:"../api/retrieveLogs.php",
  retrieveNotifications:"../api/retrieveNotifications.php",
  
  //Retrieval of Data
  fetchKPIDuration: "../api/fetchKpiDuration.php",
  fetchAllGoals: "../api/fetchAllGoals.php",
  retrieveDepartments: "../api/retrieveDepartments.php",
  retrieveCompanies: "../api/retrieveCompanies.php",
  retrievePillars: "../api/retrievePillars.php",
  retrieveTracking:"../api/retrieveTracking.php",
  retrieveTrackingScores:"../api/retrieveTrackingScores.php",
  retrieveKPIDescAndPillarPercentage: "../api/retrieveKpiDescAndPillarPercentage.php",
  retrieveEvaluation: "../api/retrieveEvaluation.php",
  retrieveTrackingEmployee: "../api/retrieveTrackingEmployee.php",
  retrieveSignOff: "../api/retrieveSignOff.php",
  retrieveSignOffEmployee: "../api/retrieveSignOffEmployee.php",
  getEmployeeGoals: "../api/getEmployeeGoals.php",
  retrieveGlobalSettings: "../api/retrieveGlobalSettings.php",
  retriveVerifyIfEvaluator: "../api/retriveVerifyIfEvaluator.php",

  retrieveReceivers: "../api/conversations/retrieveReceivers.php",
  retrieveConversations: "../api/conversations/retrieveConversations.php",
  retrieveConvo:"../api/conversations/retrieveConvo.php",

  //Submitting/Updating Data
  uploadProfilePicture: "../api/uploadImage.php",
  formCreation:"../api/formCreation.php",
  sendMail:"../api/sendmail.php",
  updateKPIDuration: "../api/updateKPIDuration.php",
  updateGoals:"../api/updateGoals.php",
  approveGoals: "../api/approveGoals.php",
  userSubmitAchievements:"../api/userSubmitAchievements.php",
  userSubmitTrackingEmployee: "../api/userSubmitTrackingEmployee.php",
  userSubmitApproval:"../api/userSubmitApproval.php",
  userSubmitSignOff:"../api/userSubmitSignOff.php",

  userSubmitNewConversation:"../api/conversations/userSubmitNewConversation.php",
  userSubmitDiscussion:"../api/conversations/userSubmitDiscussion.php",
  userSubmitNewMessage:"../api/conversations/userSubmitNewMessage.php",
  userDeleteConversation:"../api/conversations/userDeleteConversation.php",
};
