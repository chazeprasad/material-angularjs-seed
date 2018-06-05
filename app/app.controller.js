function AppController($scope, appService) {
    var vm = this;

    vm.title = "App Controller.."
    vm.onInit = ()=> {
        console.log("App Init..");
    }
}