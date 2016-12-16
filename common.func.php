<?php
function RT($file,$data=null){
    require_once 'templates/'.$file.'.tmp.php';  
}
function RAT($file,$data=null){
    require_once 'adminTemplates/'.$file.'.tmp.php';
}
function RMT($file,$data=null){
    require_once 'mobileTemplates/'.$file.'.tmp.php';
}
function CSS($css){
    echo '<link rel="stylesheet" href="css/'.$css.'.css"/>';
}
function ACSS($css){
    echo '<link rel="stylesheet" href="adminCss/'.$css.'.css"/>';
}
function MCSS($css){
    echo '<link rel="stylesheet" href="mobileCss/'.$css.'.css"/>';
}

function RP($page){
    return require_once 'page/'.$page.'.page.php';
}
function RAP($page){
    return require_once 'adminPage/'.$page.'.page.php';
}
function RMP($page){
    return require_once 'mobilePage/'.$page.'.page.php';
}
function br(){
    echo "<br/>";
}
/**
 * 检测程序执行时间
 */
function testTime(){
    if(defined('START_TIME')){
        define("END_TIME", microtime(true));
        $takeTime=END_TIME-START_TIME;
        echo "执行程序花费了：".substr($takeTime,0,6)."秒";
    }
}
/**
 * alert并跳转
 * @param string $msg 要alert的消息
 * @param string $location 要跳转的链接
 */
function alert($msg=null,$location=null){
    if($msg&&!$location){
        $script="alert('".$msg."')";
    }elseif(!$msg&&$location){
        $script="window.location='".$location."'";
    }elseif($msg&&$location){
        $script="alert('".$msg."');window.location='".$location."'";
    }
    echo "<script>$script</script>";
}
function reload(){
    echo "<script>window.location.reload();</script>";
}
/**
 * 格式化时间
 * @param string $time 未格式化的时间
 * @return string
 */
function formatTime($time){
    return date("Y-m-d H:i",$time);
}

function error($msg=false){
    if(ERROR_REPORTING){
        return mysql_error();
    }else{
        return $msg;
    }
}
/**
 * 格式化$_FILES传过来的数据
 * @param array $_file $_FILES['name']
 * @return array $file 格式化后的数据
 */
function formatFile($_file){
    for($i=0;$i<count($_file['name']);$i++){
        $file[$i]['name']=$_file['name'][$i];
        $file[$i]['type']=$_file['type'][$i];
        $file[$i]['tmp_name']=$_file['tmp_name'][$i];
        $file[$i]['error']=$_file['error'][$i];
        $file[$i]['size']=$_file['size'][$i];
    }
    return $file;
}
/**
 * 分页
 * @param string $table 要获取数据的数据表
 * @param string $url 页码指针的URL，例：test.php?page ; index.php&cate=1&page
 * @param int $max 指定页码最大显示个数
 * @param string $where sql的where条件，例：user_id=1
 * @param string $order sql的order排序规则，例：order by user_id
 * @param string $key 要获取数据表的哪些字段
 * @param number $page 要得到第几页的数据
 * @param number $step 多少条数据为一页
 * @param array|false $data 如果没有获取到数据，则返回false。否则返回$data数据；
 * $data=array(
 *      "totalPage"=>int,
 *      "data"=>array(),获取到的数据
 *      "index"=>string 页码代码
 * )
 */
function page($table,$url,$max,$where=null,$order=null,$key="*",$page=1,$step=5){
    //获取有多少条数据
    $total=mysql::countTB($table,$where);
    if(!$total){
        return false;
        exit();
    }
    //生成总共页数
    $data['totalPage']=ceil($total/$step);
    if($page<1){
        $page=1;
    }
    if($page>$data['totalPage']){
        $page=$data['totalPage'];
    }
    $start=($page-1)*$step;
    //根据页数获取数据
    if($where){
        $where="where ".$where;
    }
    $sql="SELECT {$key} FROM {$table} {$where} {$order} LIMIT {$start},{$step}";
    $data['data']=mysql::query($sql);
    if(!$data['data']){
        return false;
        exit();
    }
    //上一页的处理逻辑
    if($page==1){
        $pre="<a style='color:black'>【上一页】</a>";
    }else{
        $p=$page-1;
        $pre="<a href='$url=$p'>【上一页】</a>";
    }
    $data['index']=$pre;
    
    //如果指针个数大于页码个数，则指针个数等于页码数，否则等于指定的指针个数,页码数大于指定的指针个数显示省略号
    if($max>=$data['totalPage']){
        $max=$data['totalPage'];
        $ellipse=false;
    }else{
        $max+=1;
        $ellipse="<a>……</a>";
    }
    //添加页面指针
    for($i=1;$i<$max;$i++){
        if ($page!=$i){
            $link="<a href='$url=$i'>【{$i}】</a>";
        }else{
            $link="<a style='color:black;'>【{$i}】</a>";
        }
        $data['index'].=$link;
    }
    if($ellipse){
        $data['index'].=$ellipse;
    }
    if ($page!=$data['totalPage']){
        $link="<a href='$url=".$data['totalPage']."'>【{$data['totalPage']}】</a>";
    }else{
        $link="<a style='color:black;'>【{$data['totalPage']}】</a>";
    }
    $data['index'].=$link;
    //显示共有多少页，以及当前页码
    $data['index'].="<a>共$page/{$data['totalPage']}</a>";
    //下一页的处理逻辑
    if($page==$data['totalPage']){
        $next="<a style='color:black'>【下一页】</a>";
    }else{
        $n=$page+1;
        $next="<a href='$url=$n'>【下一页】</a>";
    }
    $data['index'].=$next;
    //如果指定页码个数大于页码数，则增加页面跳转器
    if($ellipse){
        $form="
            <form action='' method='get'>
                <input type='text' value='1' style='width:4em;' name='page'>/页
                <input type='submit' value='跳转'>
            </form>
            ";
        $data['index'].=$form;
    }
    return $data;
}

/**
 * 更灵活的分布
 * @param string $table 要计算数据总条数的数据表
 * @param string $where 计算总条数的条件
 * @param string $sql sql语句
 * @param string $url 页码指针跳转的页面
 * @param int $max 指定最大指针显示数目
 * @param number $page 页码
 * @param number $step 每页条数
 */
function page2($table,$where,$sql,$url,$max,$page=1,$step=5,$jumpget="page"){

    //获取有多少条数据
    $total=mysql::countTB($table,$where);
    if(!$total){
        return false;
        exit();
    }
    $data['total']=$total;
    //生成总共页数
    $data['totalPage']=ceil($total/$step);
    if($page<1){
        $page=1;
    }
    if($page>$data['totalPage']){
        $page=$data['totalPage'];
    }
    $start=($page-1)*$step;
    //根据页数获取数据
    $sql=$sql." LIMIT {$start},{$step}";
    $data['data']=mysql::query($sql);
    if(!$data['data']){
        return false;
        exit();
    }

    
    //上一页的处理逻辑
    if($page==1){
        $pre="<a style='color:black'>【上一页】</a>";
    }else{
        $p=$page-1;
        $pre="<a href='$url=$p'>【上一页】</a>";
    }
    $data['index']=$pre;

    //如果指针个数大于页码个数，则指针个数等于页码数，否则等于指定的指针个数,页码数大于指定的指针个数显示省略号
    if($max>=$data['totalPage']){
        $max=$data['totalPage'];
        $ellipse=false;
    }else{
        $max+=1;
        $ellipse="<a>……</a>";
    }
    //添加页面指针
    for($i=1;$i<$max;$i++){
        if ($page!=$i){
            $link="<a href='$url=$i'>【{$i}】</a>";
        }else{
            $link="<a style='color:black;'>【{$i}】</a>";
        }
        $data['index'].=$link;
    }
    if($ellipse){
        $data['index'].=$ellipse;
    }
    if ($page!=$data['totalPage']){
        $link="<a href='$url=".$data['totalPage']."'>【{$data['totalPage']}】</a>";
    }else{
        $link="<a style='color:black;'>【{$data['totalPage']}】</a>";
    }
    $data['index'].=$link;
    //显示共有多少页，以及当前页码
    $data['index'].="<a>共$page/{$data['totalPage']}</a>";
    //下一页的处理逻辑
    if($page==$data['totalPage']){
        $next="<a style='color:black'>【下一页】</a>";
    }else{
        $n=$page+1;
        $next="<a href='$url=$n'>【下一页】</a>";
    }
    $data['index'].=$next;
    //如果指定页码个数大于页码数，则增加页面跳转器
    if($ellipse){
        //以下这段代码还可以用for循环来修改，以后来改
//         $a=isset($_GET['p'])?"<input type='hidden' name='p' value='".$_GET['p']."'>":null;
//         $b=isset($_GET['cate'])?"<input type='hidden' name='cate' value='".$_GET['cate']."'>":null;
        
        $form="
            <form action='' method='get'>";
        if(isset($_GET)){
            foreach ($_GET as $k => $v){
                if($k!=$jumpget){
                    $form.="<input type='hidden' name='$k' value='$v'>";
                }
            }
        }
        $form.="
                <input type='text' value='1' style='width:4em;' name='$jumpget'>/页
                <input type='submit' value='跳转'>
            </form>
            ";
        $data['index'].=$form;
    }
    return $data;
}
/**
 * 过滤字符串使之安全
 * @param string $str 要过滤的字符串
 */
function clean($str){
    $str=htmlentities($str,ENT_QUOTES,"UTF-8");
    $str=mysql_real_escape_string($str);
    $str=inject_check($str);
    return $str;
}
/**
 * 检测用户输入是否包含敏感词
 * @param string $Sql_Str 要检查的字符串
 * @return unknown
 */
function inject_check($Sql_Str) {
    //自动过滤Sql的注入语句。
    $check=preg_match('/select|insert|update|delete|\.\.\/|\.\/|union|into|load_file|outfile/i',$Sql_Str);
    if ($check) {
        echo '<script language="JavaScript">alert("系统警告：\n\n请不要尝试在内容中包含非法字符尝试注入！");window.location="index.php"</script>';
        exit();
    }else{
        return $Sql_Str;
    }
}
/**
 * 获取文件夹下的所有文件夹名
 * @param  string  $dir   要获取下级目录的文件夹名
 * @param  boolean $child 是否递归出子目录下的子目录
 * @return array         目录名称的数组
 */
function traverseDir($dir,$child=false){
    if($dir_handle = @opendir($dir)){
        while($filename = readdir($dir_handle)){
            if($filename != "." && $filename != ".."){
                $dirArr[] = $filename;
                $subFile = $dir.DIRECTORY_SEPARATOR.$filename; //要将源目录及子文件相连
                if(is_dir($subFile)){ //若子文件是个目录
                    // echo $filename.'<br>'; //输出该目录名称
                    if($child){
                        traverseDir($subFile); //递归找出下级目录名称
                    }
                }
            }
        }
        closedir($dir_handle);
        return $dirArr;
    }
}
?>