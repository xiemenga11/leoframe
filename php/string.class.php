<?php
class str{
    public static function ArrToStr($arr,$glue=","){
        return implode($glue, $arr);
    }
    public static function randomStr($length=4){
        $strArr=array_merge(range('a','z'),range(0,9));
        $str=join("",$strArr);
        $str=str_shuffle($str);
        $str=mb_substr($str, 0,$length);
        return $str;
    }
    /**
     * 正则表达式分隔字符串，分隔后中文不会乱码
     * @param string $str 要分隔的字符串
     */
    public static function split($str){
        return preg_split('/(?<!^)(?!$)/u', $str );
    }
    /**
     * 过滤字符串使之安全
     * @param string $str 要过滤的字符串
     * @param boolean $allowHtml 是否允许html代码
     */
    public static function clean($str,$allowHtml=true){
        if(!$allowHtml){
            $str=htmlentities($str,ENT_QUOTES,"UTF-8");
        }
        $str=mysql_real_escape_string($str);
        $str=self::inject_check($str);
        return $str;
    }
    /**
     * 检测用户输入是否包含敏感词
     * @param string $Sql_Str 要检查的字符串
     * @return unknown
     */
    public static function inject_check($Sql_Str) {
        //自动过滤Sql的注入语句。
        $check=preg_match('/select|insert|update|delete|\.\.\/|\.\/|union|into|load_file|outfile/i',$Sql_Str);
        if ($check) {
            echo '<script language="JavaScript">alert("系统警告：\n\n请不要尝试在内容中包含非法字符尝试注入！");window.location="index.php"</script>';
            exit();
        }else{
            return $Sql_Str;
        }
    }

    public static function format_date($time,$type=1){
        switch ($type) {
            case 1:
                return date("Y-m-d H:i:s",$time);
                break;

            case 2:
                return date("Y-m-d",$time);
                break;

            case 3:
                return date("H:i:s",$time);
                break;
            
        }
    }
}
