var applescript = require('applescript');
module.exports = {
   emergency:function(){
    var script = 'tell application "Google Chrome" \nset windowList to every tab of every window whose URL starts with "https://www.netflix.com" \nrepeat with tabList in windowList \nset tabList to tabList as any \nrepeat with tabItr in tabList \nset tabItr to tabItr as any \ndelete tabItr \nend repeat \nend repeat \nend tell';
 
    applescript.execString(script, function(err, rtn) {
    });

    var scripto = 'tell application "Google Chrome" \nset windowList to every tab of every window whose URL starts with "https://www.youtube.com" \nrepeat with tabList in windowList \nset tabList to tabList as any \nrepeat with tabItr in tabList \nset tabItr to tabItr as any \ndelete tabItr \nend repeat \nend repeat \nend tell';
    

    applescript.execString(scripto, function(err, rtn) {
    });
   }
};
