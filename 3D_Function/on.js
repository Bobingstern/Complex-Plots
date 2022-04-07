// https://gist.github.com/UnsignedArduino/e23b8329c3a786d1e4e99d8ee941436e

// Include this JavaScript file in an HTML file and it will add a DIV element to the bottom of the page which will contain console output and
// an textarea to run JavaScript code!
// Example script include tag: <script src="/on_page_console.js"></script>

// Set false to do nothing
const on_page_console = true;

if (on_page_console) {
  (() => {
    const element_to_append_to = document.body;
    
    element_to_append_to.appendChild(document.createElement("br"));
    element_to_append_to.appendChild(document.createElement("br"));
  
    const on_page_console_div = document.createElement("div");
    on_page_console_div.style.border = "1px outset black";
    on_page_console_div.style.padding = "5px";
    
    const warning_b = document.createElement("b");
    warning_b.innerHTML = "On page console:";
    on_page_console_div.appendChild(warning_b);

    element_to_append_to.appendChild(document.createElement("br"));
    
    on_page_console_div.appendChild(document.createElement("br"));
    
    const console_textarea = document.createElement("textarea");
    console_textarea.type = "text";
    console_textarea.rows = 10;
    console_textarea.cols = 40;
    console_textarea.id = "command_input";
    console_textarea.name = "command_input";
    console_textarea.readOnly = true;
    console_textarea.style = "width: 100%; resize: vertical; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;"
    on_page_console_div.appendChild(console_textarea);

    on_page_console_div.appendChild(document.createElement("br"));
    
    const command_label = document.createElement("label");
    command_label.for = "command_input";
    command_label.innerHTML = "Run JavaScript code: " + 
                              "(Remember that you can only run code in the context " + 
                              "of <a href=\"/on_page_console.js\"><code>/on_page_console.js</code></a> - see " + 
                              "<a href=\"https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#using_eval_in_content_scripts\">here</a>.)";
    on_page_console_div.appendChild(command_label);
  
    const command_input = document.createElement("textarea");
    command_input.type = "text";
    command_input.rows = 10;
    command_input.cols = 40;
    command_input.id = "command_input";
    command_input.name = "command_input";
    command_input.style = "width: 100%; resize: vertical; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;"
    on_page_console_div.appendChild(command_input);
  
    on_page_console_div.appendChild(document.createElement("br"));
  
    const command_button = document.createElement("button");
    command_button.type = "button";
    command_button.innerHTML = "Run";
    command_button.onclick = () => {
      console.log("Result: " + eval(command_input.value));
    };
    on_page_console_div.appendChild(command_button);
  
    element_to_append_to.appendChild(on_page_console_div);
    
    const auto_scroll = true;
  
    // https://stackoverflow.com/a/50773729/10291933
    
    function produce_text(name, args) {
      return args.reduce((output, arg) => {
        return output + (typeof arg === "object" && (JSON || {}).stringify ? JSON.stringify(arg) : arg) + "\n";
      }, "");
    }
    
    function rewire_logging_func(name) {
      console["old" + name] = console[name];
      console[name] = (...arguments) => {
        console_textarea.innerHTML += produce_text(name, arguments);;
        console_textarea.scrollTop = console_textarea.scrollHeight;
        console["old" + name].apply(undefined, arguments);
      };
    }
    
    function rewire_logging() {
      rewire_logging_func("log");
      rewire_logging_func("debug");
      rewire_logging_func("warn");
      rewire_logging_func("error");
      rewire_logging_func("info");
    }
  
    window.onerror = (error_msg, url, line_number, col_number, error) => {
      let error_output;
      if (error.stack == null) {
        error_output = error_msg + "\n  URL: " + url + ":" + line_number + ":" + col_number;
      } else {
        error_output = error.stack;
      }
      console.error(error_output);
      return false;
    }
  
    rewire_logging();
  })();
}