<?php 
class View{
	public $rightSep = "}}";	//左定界符
	public $leftSep = "{{";		//右定界符
	public $tplType = "tpl";	//模板后缀
	public $cacheType = "html";		//模板缓存后缀
	public $sec_seperator = " ";	//forloop,useChildTpl,tplloop的变量分隔符
	protected $file;		
	protected $content;		//模板的内容
	protected $fileName;	//模板的名称
	protected $cacheDir;	//模板缓存的完整路径
	protected $cacheName;	//
	protected $tplDir;		//模板的完整路径
	protected $var = array("img_css_js"=>ABS_ROOT);
	public function __construct($file,$type="tpl"){
		$this->fileName = $file;
		$this->tplType = $type;
		$this->init();
	}
	/**
	 * 初始化
	 * @return [type] [description]
	 */
	public function init(){
		
		$this->cacheDir = CACHE_DIR.$this->fileName.".".$this->cacheType;
		$this->tplDir  = TPL_DIR.$this->fileName.".".$this->tplType;
		$this->content  = file_get_contents($this->tplDir);
	}
	/**
	 * 将需要替换的数据保存到内部数组
	 * @param  string $key   要替换的变量名
	 * @param  string $value 要替换的数据
	 * @return [type]        [description]
	 */
	public function assign($key,$value){
		$this->var[$key] = $value;
	}
	/**
	 * 将数据传入模板
	 * @return [type] [description]
	 */
	public function sign(){
		foreach ($this->var as $key => $value) {
			$this->content = str_replace($this->leftSep.$key.$this->rightSep, $value, $this->content);
		}
	}
	/**
	 * 更新模板缓存
	 * @return [type] [description]
	 */
	public function update(){
		$this->sign();
		file_put_contents($this->cacheDir,$this->content);
	}
	/**
	 * 删除缓存文件
	 * @return [type] [description]
	 */
	public function deleteCache(){
		unlink($this->cacheDir);
	}
	/**
	 * 得到模板内容
	 * @return [type] [description]
	 */
	public function getContent(){
		$this->sign();
		return $this->content;
	}
	/**
	 * 显示模板内容
	 * @param  boolean $cache 是否缓存
	 * @return [type]         [description]
	 */
	public function display($cache = false){
		$this->sign();
		if($cache){
			file_put_contents($this->cacheDir, $this->content);
		}
		echo $this->content;
	}
	/**
	 * 缓存模板
	 * @param  string $cacheName 缓存文件的名称，不带后缀
	 * @return string            返回缓存文件的名称
	 */
	public function cache($cacheName){
		$this->sign();
		file_put_contents(CACHE_DIR.$cacheName.".".$this->cacheType, $this->content);
		return $cacheName;
	}
	/**
	 * 得到循环数据
	 * @param  array $data     要循环的数据
	 * @param  function $callback 回调函数，让数据根据回调函数指定的样式循环，回调函数一定要有return 
	 * @return string           返回循环得到的数据
	 */
	public function forloop($config){
		$d = "";
		if(isset($config['data'])&&$config['data']){
			foreach ($config['data'] as $k => $v) {
				$d .= $config['callback']($k,$v);
			}
		}
		if(isset($config['key'])&&$config['key']){
			$this->assign("FORLOOP".$this->sec_seperator.$config['key'],$d);
		}
		return $d;
	}
	/**
	 * 使用子模板
	 * @param  array $config 使用子模板的配置信息
	 * $config = {
	 * 		key:string 要注册的模板变量名
	 * 		tpl:string 子模板的路径
	 * 		data:array 要注册到模板的数据
	 * }
	 * @return string         注册变量后的模板内容
	 */
	public function useChildTpl($config){
		$content = file_get_contents($config['tpl']);
		$config['data']['img_css_js'] = ABS_ROOT;
		if(isset($config['data'])&&$config['data']){
			foreach($config['data'] as $k => $v){
				$content = str_replace($this->leftSep.$k.$this->rightSep, $v, $content);
			}
		}
		if(isset($config['key'])&&$config['key']){
			$this->assign("USECHILDTPL".$this->sec_seperator.$config['key'],$content);
		}
		return $content;
	}
	/**
	 * 循环使用模板
	 * @param  array  $config 循环使用模板的配置信息
	 * $config = {
	 * 		key:string 要注册的变量名
	 *   	data:array 要循环的数据，二维数组
	 *   	tpl:string 循环使用的子模板
	 * }	
	 * @return string         返回循环后的内容
	 */
	public function tplloop($config){
		
		$content = "";
		if(isset($config['data'])&&$config['data']){
			foreach ($config['data'] as $value) {
				$tpl = file_get_contents($config['tpl']);
				$value['img_css_js'] = ABS_ROOT;//用于img,css,js的引用绝对路径
				foreach ($value as $k => $v) {
					$tpl = str_replace($this->leftSep.$k.$this->rightSep, $v, $tpl);
				}
				$content .= $tpl;
			}
		}
		if(isset($config['key'])&&$config['key']){
			$this->assign("TPLLOOP".$this->sec_seperator.$config['key'],$content);
		}
		return $content;
	}
	/**
	 * 条件判断
	 * @param  array $config 条件判断的配置信息
	 * $config = {
	 * 		key:string 要注册的变量名
	 * 		conditiong:boolean 判断条件
	 * 		if:string 条件为真的时候
	 * 		else:string 条件为假的时候	
	 * }
	 * @return string         判断后的内容
	 */
	public function ifelse($config){
		if($config['condition']){
			$content = $config['if'];
		}else{
			$content = $config['else'];
		}
		if(isset($config['key'])&&$config['key']){
			$this->assign("IFELSE".$this->sec_seperator.$config['key'],$content);
		}
		return $content;
	}
}
 ?>