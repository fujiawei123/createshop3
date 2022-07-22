var chart = c3.generate({
    data:{
        columns:[
            ['无用',1213],
            ['有用',3213]
        ],
        type:'donut'
    },
    colors:{

    },
    donut:{
        title:'用户认为本文的有用度'
    }
});