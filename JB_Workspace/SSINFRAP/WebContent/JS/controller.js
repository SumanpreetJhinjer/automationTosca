/*window.addEventListener('load', function () {*/
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Infra!'
  }
});
var Vue = require('vue');
var VueResource = require('vue-resource');

Vue.use(VueResource);

var stepProcess= new Vue({
	el:'#stepProcess',
	data:function(){
		return{
			showStep1:true,
			showStep2:false,
			showStep3:false,
			isDisabled2:true,
			isDisabled3:true,
			
		}
	},
	methods:{
		getTeamName: function(){
			Vue.$http.get('rest/hello').then(function(data,Status,request){
				alert(data);
			})
		},
		nextStep: function(){
			console.log(this);
			this.showStep1=false;
			this.showStep2=true;
			this.showStep3=false;
			this.isDisabled2=false;
			
			},
		nextStep2: function(){
			
			console.log(this);
			this.showStep1=false;
			this.showStep2=false;
			this.showStep3=true;
			this.isDisabled3=false;
			},
		previousStep1: function(){
			this.showStep1=true;
			this.showStep2=false;
			this.showStep3=false;
			
		},
		previousStep2: function(){
			this.showStep1=false;
			this.showStep2=true;
			this.showStep3=false;
			
		}
	},
	beforeMount(){
		this.getTeamName()
	}
/*});*/



})