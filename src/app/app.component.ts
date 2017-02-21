import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
   <div>
   <ul class="topnav" id="myTopnav">
    
    <br>
    <router-outlet></router-outlet>
    </ul>
    </div>
  `,
  styles: [`
  .image{width:1300px; height:900px; }
  .logo{
    
    width:100px;height:100px; }
     


#bar { display: block; height: 0px; background:white; padding-top: 0px; margin-bottom: 150px; position: relative; }
#bar ul { margin: 0px 15px; font-family: Candara, Calibri, "Segoe UI", Segoe, Arial, sans-serif; }
#bar ul li {  background: #22385a; display: block; font-size: 1.2em; position: relative; float: left; }
#bar ul li a { 
display: block; 
color: white; 
line-height: 45px; 
font-weight: bold; 
padding: 0px 10px; 
text-decoration: none;
z-index: 9999;
}
 
#bar ul li a:hover, #bar ul li a.selected {
color: #365977;
background: white;
border-top-left-radius: 3px;
border-top-right-radius: 3px;
-webkit-border-top-left-radius: 3px;
-webkit-border-top-right-radius: 3px;
-moz-border-radius-topleft: 3px;
-moz-border-radius-topright: 3px;
}
 
#bar ul .subnav {
display: block;
left: 14px;
top: 48px;
z-index: -1;
width: 500px;
position: absolute;
height: 90px;
border: 1px solid #edf0f3;
border-top: 0;
padding: 10px 0 10px 10px; 
overflow: hidden;
-moz-border-radius-bottomleft: 3px;
-moz-border-radius-bottomleft: 3px;
-webkit-border-bottom-left-radius: 3px;
-webkit-border-bottom-right-radius: 3px;
border-bottom-right-radius: 3px;
border-bottom-right-radius: 3px;
-moz-box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
-webkit-box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
-ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=3, Direction=180, Color='#333333')";
filter: progid:DXImageTransform.Microsoft.Shadow(Strength=3, Direction=180, Color='#333333');
}
  `]
})
export class AppComponent {
 title = 'Document Service';
  selectedColor:any = 0;
  color;
  img;
  
 myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
  
  modelChanged(evt){
    alert(evt);
  }
  
  constructor(){
  }
}
