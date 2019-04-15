Vec3 =function(x,y,z)
{
    this.x =x;
    this.y =y;
    this.z =z;
}
Vec3.prototype.add = function(v)
{
    this.x +=v.x;
    this.y +=v.y;
    this.z +=v.z;
    return this;
}

Vec3.prototype.sum = function()
{
    return this.x +this.y +this.z;
}

Vec3.prototype.min = function()
{
    var min=this.x;
    if(min>this.y){
	min =this.y;
    }
    if(min>this.z){
	min =this.z;
    }
    return min;
}
Vec3.prototype.mid = function()
{
    var min=this.x;
    var max,mid;
    if(min>this.y){
	min =this.y;
	max= this.x;
    }
    else{
	max =this.y;
    }
    if(this.z<min){
	mid =min;
    }
    else if(this.z>max){
	mid =max;
    }
    else{
	mid = this.z;
    }
    return mid;
}
Vec3.prototype.max = function()
{
    var max=this.x;
    if(max<this.y){
	max =this.y;
    }
    if(max<this.z){
	max =this.z;
    }
    return max;
}

function AreaOfTriangle(v0,v1,v2)
{
    var l0 = Math.sqrt((v0.x -v1.x)*(v0.x -v1.x)+(v0.y -v1.y)*(v0.y -v1.y)+(v0.z -v1.z)*(v0.z -v1.z));
    var l1 = Math.sqrt((v2.x -v1.x)*(v2.x -v1.x)+(v2.y -v1.y)*(v2.y -v1.y)+(v2.z -v1.z)*(v2.z -v1.z));
    var l2 = Math.sqrt((v0.x -v2.x)*(v0.x -v2.x)+(v0.y -v2.y)*(v0.y -v2.y)+(v0.z -v2.z)*(v0.z -v2.z));
    var s = (l0+l1+l2)/2;
    return Math.sqrt(s*(s-l0)*(s-l1)*(s-l2));
    
}
