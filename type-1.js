var p = document.getElementById('text_en');
var j = document.getElementById('text_jp');

//スコア系統の定義
let time_limit = 90;
let readytime = 3;
let score;
let correct;
let miss;

let gHeight // 実画面の高さ
let gWidth // 実画面の幅

let Width = 100;
let Height = 120;

//日本語の内容
let quiz_jp = [
    '浮気性のナポレオン',
    '戦う人へのエチケット',
    '悲しみのボイコット',
    '風呂上がりに誤送信',
    'エメラルドの逆恨み',
    '夕方のポニーテール',
    '無宗教のお笑い芸人',
    'おもちのチュートリアル',
    '楽しい落書き',
    '頭痛が痛い',
    'カルボナーラビジネス'
];

//英語の内容
let quiz_en = [
    'uwakisyounonaporeonn',
    'tatakauhitohenoetiketto',
    'kanasiminoboikotto',
    'huroagarinigosousinn',
    'emerarudonosakaurami',
    'yuugatanoponi-te-ru',
    'musyuukyounoowaraigeininn',
    'omotinotyu-toriaru',
    'tanosiirakugaki',
    'zutuugaitai',
    'karubona-rabizinesu'
];

let checkText = [];


//ゲームスタート準備
function　ready(){
    readytime = 3;
    counts.play();
         start_button.style.visibility ="hidden";

    let readytimer = setInterval(function(){
        count.innerHTML=readytime;
        readytime--;
        if(readytime < 0){
           clearInterval(readytimer);
            gameStart();
           }
    },1000);
}

//ゲームスタート
function gameStart() { createText();

correct = 0;
miss = 0;

let timelimits = time_limit;
let gameTime = setInterval(function(){
count.innerHTML = '残り時間' + timelimits;
timelimits--;
if(timelimits <= 0){
    clearInterval(gameTime);
    finish();
}
},1000);

function createText() {

    //ランダムに文字列を取得する
    let rnd = Math.floor(Math.random() * quiz_en.length);

    //前の文字列を消去する
    p.textContent = '';
    j.textContent = '';

    //日本語の表示
    j.textContent = quiz_jp[rnd];

//一文字づつで区切る　書き出し
checkText = quiz_en[rnd].split('').map(function(value) {
    let span = document.createElement('span');

    span.textContent = value;
    p.appendChild(span);
    return span;
});

}

document.addEventListener('keydown' ,keyDown);

//入力判定の設定
function keyDown(e) {
    if(e.key === checkText[0].textContent) {
        checkText[0].className = 'add-bule';

        checkText.shift();

        if(!checkText.length) createText();
        ok_audio.pause();
        ok_audio.currentTime = 0;
        ok_audio.play();
        correct++;
    } else {
        miss++;
        miss_audio.pause();
        miss_audio.currentTime = 0;
        miss_audio.play();
    }
}

}

function finish() {
    //ボタンの再表示
    start_button.style.visibility ="visible";
    p.innerHTML = '';
    j.innerHTML = '';
    count.innerHTML = '';
    checkText = '';
    scoredis.innerHTML = '<br>正タイプ数' + correct + '　誤タイプ数' + miss + '<br>正答率' + 
    (correct/(correct+miss)*100).toFixed(2) + '%' + '<br><br>タイピング速度' + ((correct+miss) / 90).toFixed(2) + '回/秒';
}

//ここまでで一旦終了—————————————————————————

function WmSize() {
    const mi = document.getElementById('all'); // mainキャンパスの要素を取得
    mi.width = window.innerWidth; //　キャンパスの幅をブラウザの幅に変更
    mi.height = window.innerHeight;//　キャンパスの高さをブラウザの高さに変更

    gWidth = mi.width;
    gHeight = mi.height;
    if( gWidth / Width < gHeight / Height ){
        gHeight = gWidth * Height / Width
    }else{
        gWidth = gHeight * Width  / Height
    }
}

window.onload = function() {
    window.addEventListener("resize", function(){ WmSize() } ); //　ブラウザサイズ変更時に画面の大きさを変更する
    WmSize();
}
