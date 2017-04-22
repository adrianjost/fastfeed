<?php require("inc/html/head.php");?>
<body>
<?php require("inc/html/header.php");?>

<main>
    <div id="contentwrapper">
        <section class="container" id="cards"></section>
        <section class="container hidden" id="fullcard"></section>
    </div>
    <section id="aboutcard" class="container hidden">
        <div class="card-panel single-card fullarticle">
            <h2 class="title">About <i>Fast</i><b>Feed</b></h2>
            <div class="content">
                <p><i>Fast</i><b>Feed</b> was developed to enjoy content of famous websites as fast as you have never seen it before. Yes, you can even use it on 2G-Networks with loading-times less than 15 seconds.</p>
                <p>We use modern web-technologies to load articles as fast as possible and every line of code was created with love and a lot of care. If you have any performance issues: please contact us!</p>
                <p>And Yes, <i>Fast</i><b>Feed</b> is Open-Source!</br>Checkout here: <a href="https://github.com/adrianjost/fastfeed" target="_blank">Github</a></p>
                <div class="spende"><p>Do you enjoy <i>Fast</i><b>Feed</b>?</p><form onsubmit="location.href='https://www.paypal.me/AdrianJostHackedIT/'+((document.getElementById('euro').value=='')?'5':(document.getElementById('euro').value)); return false;"><label><input id="euro" placeholder="5" onkeypress="return (/^[0-9]$/.test(event.key))">&nbsp;€&nbsp;&nbsp;</label><button class="button-two" type="submit">Donate</button></form></div>
            </div>
        </div>
    </section>
    <section id="settingscard" class="container hidden">
        <div class="card-panel single-card fullarticle">
            <h2 class="title">Settings</h2>
            <div class="content">
                Insert random buttons here
            </div>
        </div>
    </section>
</main>

<?php require("inc/html/footer.php");?>
</body>
</html>