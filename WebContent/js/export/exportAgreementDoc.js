function generate() {
    var doc = new DDoc();
    doc.addParagraph("#");
//    doc.addParagraph("添加一个段落，设置字体和大小",{
//        font:"Microsoft YaHei UI",
//        italic:true,
//        underline:doc.UnderlineType.Wave,
//        underlineColor:"FF0000",
//        strike:true,
//        shadow:"FFFFFF",
//        textAlign:doc.AlignType.Center,
//        lineHeight:3
//    });
    doc.addParagraph("员工劳动合同",{
        font:"Microsoft YaHei UI",
        fontSize:"44",
        bold:true,
        color:"FFFFFF",
    });
    doc.newLine();
    doc.addParagraph("用人单位名称：");
    doc.addHeader("用人单位名称", doc.HeaderType.H1);
    doc.addHeader("标题2", doc.HeaderType.H2,{
        font:"Microsoft YaHei UI",
        underline:doc.UnderlineType.Double,
        color:"67ff56",
        underlineColor:"FF0000"
    });

    doc.addList(['第1章', '第2章', '第3章']);
    doc.addList(['第一章', '第二章', '第三章'],{
        color:"FF0000"
    });

    doc.addEmptyTable(4, 5);
    doc.newLine();
    doc.addTable([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ],{color:"FF0000"});

    doc.newLine();
    doc.addTable([
        [1, 2, 4,4,5],
        [doc.Merge.CC,3, doc.Merge.RC,5,8],
        [7, 8, 4,doc.Merge.CC,9],
        [1, 2, doc.Merge.RC,doc.Merge.CC,5]
    ]);

    var _temp="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAAmCAIAAADyTaq0AAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAWFJREFUWEftVgkOhCAMVB+0L9n/f4flUGQVcIptPQIhakwpnZm2MA6f7/C8YdaQw+foHtOtgRgzZGcMOoLyHzpg7FZts0p1Io+zM0pgWuW3yZOdBX9yyqRSHAkTgsPFUwIzS+9f/3Ba1Sms2+SYt8KVsbXoA6w/ZxBLhynlyeZ/CDj8REYOCQzGtRQAyWqDRMRvgytzbu+QcsJDBUx6GmSrnAmkBYM0kdbdVASJwU0zlkq0zemxX0g8NygUOtqWNKvIE/sM2Jqsma4gsRxVaobCMN12TQAMDFJWZ45IdO1B98DA0OnKryiRwuTfg4nFwOT0KjcejHa9SoFN0qy5BUvFRvbbXDN3VBMEs6/cQBu1zZ20P9AKBENW/JIFymAE7zOWPmUwsoJtwAifasUa4wH5NmXQixEPe5Je3qaMJFe6vrsyunzju3VlcK54LWPfLZxXXRlevvm8dWX4uOT19CplfqqGCgdY+hAkAAAAAElFTkSuQmCC";
    doc.addImage(_temp,100,50,{
        textAlign:doc.AlignType.Center
    });
    doc.generate();
}