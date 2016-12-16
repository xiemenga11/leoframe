<?php
class Image{
    /**
     * 上传图片
     * @param array $file post过来的图片array
     * @param string $dir 上传图片的路径
     * @param number $size 限制图片大小，默认1024KB
     * @return boolean[]|string[] 成功时返回图片上传后的名字，失败返回错误信息，内部字段：$data['name'] 文件上传后的名字； $data['error'] 上传错误时的错误信息
     */
    public static function uploadImg($file,$dir,$size=1024){
        $data=array(
            "error"=>false
        );
        //创建文件夹
        if(!is_dir($dir)){
            if(!mkdir($dir)){
                $data['error']="创建文件夹失败";
                return $data;
                exit();
            }
        }
        //判断文件是否是post上传的
        if(!is_uploaded_file($file['tmp_name'])){
            $data['error']='错误的上传方式';
            return $data;
            exit();
        }
        //获取文件后缀
        $nameData=explode('.', $file['name']);
        list($name,$type)=$nameData;
        
        //判断文件类型是否符合要求
        $types=array("png","jpg","jpeg","gif");
        if(!in_array($type,$types)){
            $data['error']="不支持后缀为".$type."的文件";
            return $data;
            exit();
        }
        //判断文件大小
        if($file['size']>$size*1024){
            $data['error']="文件过大，不能超过".$size."KB";
            return $data;
            exit();
        }
        //生成唯一文件名
        $data['name']=md5(uniqid($name)).".".$type;
        //上传文件
        if(!move_uploaded_file($file['tmp_name'], $dir."/".$data['name'])){
            $data['error']="上传失败";
            return $data;
            exit();
        }
        
        
        return $data;
    }
    /**
     * 删除文件
     * @param string $filename 要删除的文件路径
     * @return string|boolean 删除成功返回文件名，删除失败返回false
     */
    public static function delete($filename){
        if(unlink($filename)){
            return $filename;
        }else{
            return false;
        }
    }
    
    public $img=null;//创建图像的handle
    public $width=null;
    public $height=null;
    /**
     * 创建图像
     * @param int $width 宽
     * @param int $height 高
     */
    public function creImg($width,$height){
        $this->img=imagecreatetruecolor($width, $height);
        $this->width=$width;
        $this->height=$height;
    }
    /**
     * 从图片创建图像
     * @param string $filename 图片的完整路径，图片名不能是中文
     */
    public function creImgFrom($filename){
        $type=explode(".", $filename);
        $type=$type[count($type)-1];
        if($type=="jpg"){
            $type="jpeg";
        }
        $this->type=$type;
        $createfrom="imagecreatefrom".$type;
        $this->img=$createfrom($filename);
    }
    /**
     * 创建颜色
     * @param sring $color 颜色名称
     * @param int $red 红色值0-255
     * @param int $green 绿色值0-255
     * @param int $blue 蓝色值0-255
     * @param int $alpha 透明度0-127
     * 如果要使用颜色，就使用对象的颜色名称，例：$image->blue
     */
    public function creColor($color,$red,$green,$blue,$alpha=0){
        $this->randClo=$this->$color=imagecolorallocatealpha($this->img,$red, $green, $blue, $alpha);
    }
    /**
     * 设置图片的背景色
     * @param object $color creColor()得到的颜色对象，例：$img->blue
     */
    public function bgClo($color){
        imagefill($this->img, 0, 0, $color);
    }
    /**
     * 画一个矩形并填充
     * @param int $x1 矩形左上角X坐标
     * @param int $y1 矩形左上角Y坐标
     * @param int $x2 矩形右下角X坐标
     * @param int $y2 矩形右下角Y坐标
     * @param object $color creColor()得到的颜色对象，例：$img->blue
     * @param boolean $filled 是否填充，默认要填充
     */
    public function rectangle($x1, $y1, $x2, $y2, $color,$filled=true){
        if($filled){
            imagefilledrectangle($this->img, $x1, $y1, $x2, $y2, $color);
        }else{
            imagerectangle($this->img, $x1, $y1, $x2, $y2, $color);
        }
    }
    /**
     * 画一个像素点
     * @param int $x 像素点的X坐标
     * @param int $y 像素点的Y坐标
     * @param object $color creColor()得到的颜色对象，例：$img->blue
     */
    public function pixel($x, $y, $color){
        imagesetpixel($this->img, $x, $y, $color);
    }
    /**
     * 画一条直线
     * @param int $x1 起点的X坐标
     * @param int $y1 起点的Y坐标
     * @param int $x2 终点的X坐标
     * @param int $y2 终点的Y坐标
     * @param object $color creColor()得到的颜色对象，例：$img->blue
     */
    public function line($x1, $y1, $x2, $y2, $color){
        imageline($this->img, $x1, $y1, $x2, $y2, $color);
    }
    /**
     * 生成随机颜色
     * @param int $min rgb的最小值，默认0，范围0-255
     * @param int $max rgb的最大值，默认255，范围0-255
     * @param int $alpha 透明度，默认0  不透明，范围0-127
     */
    public function randClo($min=0,$max=255,$alpha=0){
        return imagecolorallocatealpha($this->img, mt_rand($min,$max), mt_rand($min,$max), mt_rand($min,$max), $alpha);
    }
    /**
     * 图像旋转
     * @param int $angle 旋转角度0-360
     * @param object $bgd_color 旋转后没有覆盖的地方的颜色，默认没有，可传入creColor()得到的颜色对象，例：$img->blue
     * @param int $alpha 旋转后是否忽略透明色，如果设为非零值透明值会被忽略，否则将保留透明值
     */
    public function spin($angle, $bgd_color=null,$alpha=0){
        $this->img=imagerotate($this->img, $angle, $bgd_color,$alpha);
    }
    /**
     * 缩小图像
     * @param int $width 新宽度
     * @param int $height 新高度
     */
    public function scale($width,$height){
        imagescale($this->img, $width,$height);
    }
    /**
     * 设置画 多边形，椭圆，线段是的线段宽度
     * @param int $thickness 线宽像素，例：5   那么线段就是5像素宽
     */
    public function lineWid($thickness){
        imagesetthickness($this->img, $thickness);
    }
    /**
     * 将字符串写在图像上，缺点不能设置角度，和字体大小,字符以左上角为原点
     * @param int $x 字符串原点的X坐标，默认0
     * @param int $y 字符串原点的Y坐标，默认0
     * @param string $string 要写在图片上的字符串
     * @param object $color creColor()得到的颜色对象，例：$img->blue
     * @param int $fonttype 字体类型，使用内置字体，范围1-5；默认5
     */
    public function string($string,$color,$x=0,$y=0,$fonttype=5){
        imagestring($this->img, $fonttype, $x, $y, $string, $color);
    }
    /**
     * 将字符串写在图像上，可以设置大小和角度，字符串以左下角为原点
     * 字体路径在config里配置好，FONTDIR
     * @param string $text 要写在图片上的字符串
     * @param object $color creColor()得到的颜色对象，例：$img->blue
     * @param number $size 字体大小
     * @param number $angle 字符串的角度
     * @param number $x 字符串原点的X坐标， 默认0
     * @param number $y 字符串原点的Y坐标，默认字体大小$size
     */
    public function text($text,$color,$size=16,$angle=0,$x=0,$y=0){
        if(!$y){
            $y=$size;
        }
        imagettftext($this->img, $size, $angle, $x, $y, $color, FONTDIR, $text);
    }
    /**
     * 保存生成的图片
     * @param string $type 要保存的图片类型
     * @param string $filename 要保存的图片路径和图片名，无需带图片后缀
     */
    public function store($type,$filename){
        if($type=="jpg"){
            $type="jpeg";
        }
        $imglayout="image".$type;
        $imglayout($this->img,$filename);
    }
    /**
     * 图片重新采样，并定义尺寸
     * @param string $filename 图片的完整路径
     */
    public function resize($filename,$config=null){
//         if($config){
//             $width=$config['width'];
//             $height=$config['height'];
//         }else{
//             list($width,$height)=getimagesize($filename);
//         }
//         if($config){
//             $dx=$config['dx'];
//             $dy=$config['dy'];
//             $ix=$config['ix'];
//             $iy=$config['iy'];
//         }else{
//             $dx=0;
//             $dy=0;
//             $ix=0;
//             $iy=0;
//         }
        $imgSize=getimagesize($filename);
        $con=array(
            "dx"=>0,
            "dy"=>0,
            "ix"=>0,
            "iy"=>0,
            "width"=>$imgSize[0],
            "height"=>$imgSize[1]
        );
        if($config){
            foreach ($config as $k => $y){
                $con[$k]=$y;
            }
        }
        $type=explode(".", $filename);
        $type=$type[count($type)-1];
        if($type=="jpg"){
            $type="jpeg";
        }
        $createfrom="imagecreatefrom".$type;
        $imgsrc=$createfrom($filename);
        imagecopyresampled($this->img, $imgsrc, $con['dx'], $con['dy'], $con['ix'], $con['iy'], $this->width, $this->height, $con['width'], $con['height']);
    }
    /**
     * 为图片添加水印
     * @param string $filename 水印图片的完整路径
     * @param number $x 水印图片的X坐标
     * @param number $y 水印图片的Y坐标
     */
    public function mark($filename,$x=0,$y=0){
        list($width,$height)=getimagesize($filename);
        $type=explode(".", $filename);
        $type=$type[count($type)-1];
        if($type=="jpg"){
            $type="jpeg";
        }
        $createfrom="imagecreatefrom".$type;
        $imgsrc=$createfrom($filename);
        imagecopyresampled($this->img, $imgsrc, $x, $y, 0, 0, $width, $height, $width, $height);
    }
    /**
     * 显示图片
     * @param string $type 要显示成的图片类型，例png
     */
    public function layout($type,$filename=null){
        
        if($type=="jpg"){
            $type="jpeg";
        }
        header("Content-Type:image/".$type);
        $imglayout="image".$type;
        $imglayout($this->img,$filename);
        imagedestroy($this->img);
    }
}