
$(document).ready(function(){
    // só se estiver no myPowh
    if(document.getElementById('inputAddress')){
        var cookie = Cookies.get('addr');
        if(cookie && document.getElementById('inputRemember'))
        {
            document.getElementById('inputRemember').checked=true;
            document.getElementById('inputAddress').value=cookie;
        }

        $("#trackButton").show();
        startWeb3();

        $("#trackButton").click(function(){
            refreshData();
        });

        $("#fshort").click(function(){
            document.getElementById('btBuy').value = "Buy F3D Quick with our Referral";
            contractAddr = '0x4e8ecF79AdE5e2C49B9e30D795517A81e0Bf00B8';
            notice = '<div class="mt-3"><div class="alert alert-warning text-secondary small">This is only a front-end, to help you interact with the <b>F3D Quick</b> contract. Before submitting transactions always confirm that you are sending them to the <b>F3D Quick</b> Contract address: <a href="https://etherscan.io/address/'+contractAddr+'" class="text-secondary" target="_blank">'+contractAddr.substring(0,10)+'...'+contractAddr.substring(38)+'</a></div></div>';

            tokenContract = web3.eth.contract(abi).at(contractAddr);
            refreshData();
        });

        $("#flong").click(function(){
            document.getElementById('btBuy').value = "Buy F3D Long with our Referral";
            contractAddr = '0xA62142888ABa8370742bE823c1782D17A0389Da1';
            notice = '<div class="mt-3"><div class="alert alert-warning text-secondary small">This is only a front-end, to help you interact with the <b>F3D Long</b> contract. Before submitting transactions always confirm that you are sending them to the <b>F3D Long</b> Contract address: <a href="https://etherscan.io/address/'+contractAddr+'" class="text-secondary" target="_blank">'+contractAddr.substring(0,9)+'...'+contractAddr.substring(38)+'</a></div></div>';
            tokenContract = web3.eth.contract(abi).at(contractAddr);
            refreshData();
        });

        $("#ethToSpend").on('input',function(){
            updatePrice();
        });

        $("#fWhales").click(function(){
            myTeam = 0;
        });
        $("#fBears").click(function(){
            myTeam = 1;
        });
        $("#fSneks").click(function(){
            myTeam = 2;
        });
        $("#fBulls").click(function(){
            myTeam = 3;
        });
    }
});

var web3;
var isMetaMask = false;
var addr=null;
var tOut;
var tokenContract=null;
var endTime = 0;
var contractAddr = '0x4e8ecF79AdE5e2C49B9e30D795517A81e0Bf00B8';
var affName = 'specialone';
var myTeam = 2;
var notice = '<div class="mt-3"><div class="alert alert-warning text-secondary small">This is only a front-end, to help you interact with the <b>F3D Quick</b> contract. Before submitting transactions always confirm that you are sending them to the <b>F3D Quick</b> Contract address: <a href="https://etherscan.io/address/'+contractAddr+'" class="text-secondary" target="_blank">'+contractAddr.substring(0,10)+'...'+contractAddr.substring(38)+'</a></div></div>';
var abi = [{"constant":true,"inputs":[],"name":"getBuyPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_affCode","type":"bytes32"},{"name":"_team","type":"uint256"},{"name":"_eth","type":"uint256"}],"name":"reLoadXname","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"activate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pIDxAddr_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"airDropTracker_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"round_","outputs":[{"name":"plyr","type":"uint256"},{"name":"team","type":"uint256"},{"name":"end","type":"uint256"},{"name":"ended","type":"bool"},{"name":"strt","type":"uint256"},{"name":"keys","type":"uint256"},{"name":"eth","type":"uint256"},{"name":"pot","type":"uint256"},{"name":"mask","type":"uint256"},{"name":"ico","type":"uint256"},{"name":"icoGen","type":"uint256"},{"name":"icoAvg","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"bytes32"}],"name":"plyrNames_","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"fees_","outputs":[{"name":"gen","type":"uint256"},{"name":"p3d","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"pIDxName_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_affCode","type":"uint256"},{"name":"_team","type":"uint256"},{"name":"_eth","type":"uint256"}],"name":"reLoadXid","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_nameString","type":"string"},{"name":"_affCode","type":"address"},{"name":"_all","type":"bool"}],"name":"registerNameXaddr","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_pID","type":"uint256"},{"name":"_addr","type":"address"},{"name":"_name","type":"bytes32"},{"name":"_laff","type":"uint256"}],"name":"receivePlayerInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"rndTmEth_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rID_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_pID","type":"uint256"}],"name":"getPlayerVaults","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_nameString","type":"string"},{"name":"_affCode","type":"bytes32"},{"name":"_all","type":"bool"}],"name":"registerNameXname","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentRoundInfo","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_affCode","type":"address"},{"name":"_team","type":"uint256"},{"name":"_eth","type":"uint256"}],"name":"reLoadXaddr","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_affCode","type":"uint256"},{"name":"_team","type":"uint256"}],"name":"buyXid","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_pID","type":"uint256"},{"name":"_name","type":"bytes32"}],"name":"receivePlayerNameList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_nameString","type":"string"},{"name":"_affCode","type":"uint256"},{"name":"_all","type":"bool"}],"name":"registerNameXID","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_affCode","type":"address"},{"name":"_team","type":"uint256"}],"name":"buyXaddr","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"plyrRnds_","outputs":[{"name":"eth","type":"uint256"},{"name":"keys","type":"uint256"},{"name":"mask","type":"uint256"},{"name":"ico","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_affCode","type":"bytes32"},{"name":"_team","type":"uint256"}],"name":"buyXname","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_otherF3D","type":"address"}],"name":"setOtherFomo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"potSplit_","outputs":[{"name":"gen","type":"uint256"},{"name":"p3d","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTimeLeft","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_rID","type":"uint256"},{"name":"_eth","type":"uint256"}],"name":"calcKeysReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_keys","type":"uint256"}],"name":"iWantXKeys","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"activated_","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"airDropPot_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"plyr_","outputs":[{"name":"addr","type":"address"},{"name":"name","type":"bytes32"},{"name":"win","type":"uint256"},{"name":"gen","type":"uint256"},{"name":"aff","type":"uint256"},{"name":"lrnd","type":"uint256"},{"name":"laff","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"potSwap","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"getPlayerInfoByAddress","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"playerID","type":"uint256"},{"indexed":true,"name":"playerAddress","type":"address"},{"indexed":true,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"isNewPlayer","type":"bool"},{"indexed":false,"name":"affiliateID","type":"uint256"},{"indexed":false,"name":"affiliateAddress","type":"address"},{"indexed":false,"name":"affiliateName","type":"bytes32"},{"indexed":false,"name":"amountPaid","type":"uint256"},{"indexed":false,"name":"timeStamp","type":"uint256"}],"name":"onNewName","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"compressedData","type":"uint256"},{"indexed":false,"name":"compressedIDs","type":"uint256"},{"indexed":false,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"playerAddress","type":"address"},{"indexed":false,"name":"ethIn","type":"uint256"},{"indexed":false,"name":"keysBought","type":"uint256"},{"indexed":false,"name":"winnerAddr","type":"address"},{"indexed":false,"name":"winnerName","type":"bytes32"},{"indexed":false,"name":"amountWon","type":"uint256"},{"indexed":false,"name":"newPot","type":"uint256"},{"indexed":false,"name":"P3DAmount","type":"uint256"},{"indexed":false,"name":"genAmount","type":"uint256"},{"indexed":false,"name":"potAmount","type":"uint256"},{"indexed":false,"name":"airDropPot","type":"uint256"}],"name":"onEndTx","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"playerID","type":"uint256"},{"indexed":false,"name":"playerAddress","type":"address"},{"indexed":false,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"ethOut","type":"uint256"},{"indexed":false,"name":"timeStamp","type":"uint256"}],"name":"onWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"playerAddress","type":"address"},{"indexed":false,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"ethOut","type":"uint256"},{"indexed":false,"name":"compressedData","type":"uint256"},{"indexed":false,"name":"compressedIDs","type":"uint256"},{"indexed":false,"name":"winnerAddr","type":"address"},{"indexed":false,"name":"winnerName","type":"bytes32"},{"indexed":false,"name":"amountWon","type":"uint256"},{"indexed":false,"name":"newPot","type":"uint256"},{"indexed":false,"name":"P3DAmount","type":"uint256"},{"indexed":false,"name":"genAmount","type":"uint256"}],"name":"onWithdrawAndDistribute","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"playerAddress","type":"address"},{"indexed":false,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"ethIn","type":"uint256"},{"indexed":false,"name":"compressedData","type":"uint256"},{"indexed":false,"name":"compressedIDs","type":"uint256"},{"indexed":false,"name":"winnerAddr","type":"address"},{"indexed":false,"name":"winnerName","type":"bytes32"},{"indexed":false,"name":"amountWon","type":"uint256"},{"indexed":false,"name":"newPot","type":"uint256"},{"indexed":false,"name":"P3DAmount","type":"uint256"},{"indexed":false,"name":"genAmount","type":"uint256"}],"name":"onBuyAndDistribute","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"playerAddress","type":"address"},{"indexed":false,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"compressedData","type":"uint256"},{"indexed":false,"name":"compressedIDs","type":"uint256"},{"indexed":false,"name":"winnerAddr","type":"address"},{"indexed":false,"name":"winnerName","type":"bytes32"},{"indexed":false,"name":"amountWon","type":"uint256"},{"indexed":false,"name":"newPot","type":"uint256"},{"indexed":false,"name":"P3DAmount","type":"uint256"},{"indexed":false,"name":"genAmount","type":"uint256"}],"name":"onReLoadAndDistribute","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"affiliateID","type":"uint256"},{"indexed":false,"name":"affiliateAddress","type":"address"},{"indexed":false,"name":"affiliateName","type":"bytes32"},{"indexed":true,"name":"roundID","type":"uint256"},{"indexed":true,"name":"buyerID","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"timeStamp","type":"uint256"}],"name":"onAffiliatePayout","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"roundID","type":"uint256"},{"indexed":false,"name":"amountAddedToPot","type":"uint256"}],"name":"onPotSwapDeposit","type":"event"}];

function countdown(s) {
    return new Date(s * 1e3).toISOString().slice(-13, -5);
}

function startWeb3()
{
    if (typeof web3 !== 'undefined') {
        isMetaMask = web3.currentProvider.isMetaMask;
    }
    if(!isMetaMask){
        web3 = require('web3');
        web3 = new web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/579b4eddc6e444c7a17bd45aa4f32aea'));
    }

    tokenContract = web3.eth.contract(abi).at(contractAddr);

    refreshData();
}
function countdownsec(s) {
    return new Date(s * 1e3).toISOString().slice(-10, -5);
}
function refreshData(justWait = true){
    let lastTime =	parseInt(localStorage.getItem("lastquery"))+30;
    if(justWait && lastTime > Date.now()/1000){
        document.getElementById('addressFeedback').innerHTML = 'Please wait ' + countdownsec(lastTime - Date.now()/1000) + ' before you make another query!<br><br>' ;
        gtag('event', 'see_f3d',{'event_category': 'click','event_label': 'F3D Refresh Error'});
        return;
    }
    document.getElementById('updateFeedback').innerHTML="<img src='images/ripple.gif'>";
    $("#btReinvest").hide();
    $("#btWithdraw").hide();

    if(isMetaMask) {
        addr = web3.eth.accounts[0];
        if(addr!=undefined){
            document.getElementById('inputAddress').value = addr;
            document.getElementById('addressFeedback').innerText = '';
        }
        else
        {
            document.getElementById('inputAddress').value = "MetaMask Detected!";
            document.getElementById('addressFeedback').innerText = 'Please login on MetaMask or wait that MetaMask loads your wallet!';
        }
    }
    else{
        addr = document.getElementById('inputAddress').value;
    }

    if(web3.isAddress(addr) && !isMetaMask)
    {
        document.getElementById('addressFeedback').innerText = '';
        if(document.getElementById('inputRemember').checked){
            Cookies.set('addr', addr, { expires: 7 });
            gtag('event', 'see_f3d',{'event_category': 'click','event_label': 'F3D Saved Address'});
        }
        else
        {
            Cookies.remove('addr');
            gtag('event', 'see_f3d',{'event_category': 'click','event_label': 'F3D Widthout Address'});
        }
        web3.eth.defaultAccount = addr;
    }
    else if(isMetaMask){
        gtag('event', 'see_f3d',{'event_category': 'click','event_label': 'F3D With MM'});
    }
    else if(addr!="")
    {
        document.getElementById('addressFeedback').innerText = 'Invalid ETH Address.';
        gtag('event', 'see_f3d',{'event_category': 'click','event_label': 'F3D Invalid Address'});
        return;
    }

    getCurrentRoundInfo();


    localStorage.setItem("lastquery", Date.now()/1000);
    tOut = setTimeout(refreshData, 60000); //1m

}

function relogio(){
    $('#rT').html(countdown(endTime - Date.now()/1000));
    setTimeout(relogio, 1000); //1s
}

function getCurrentRoundInfo(){
    clearTimeout(tOut);
    tokenContract.getCurrentRoundInfo(function(error, result){
        if(!error){

            $('#rN').html(""+result[1]);
            $('#rN2').html(""+result[1]);
            $('#sTime').html(moment(result[4].toNumber() * 1e3).fromNow());
            endTime = result[3].toNumber();

            let tSneak = Number(web3.fromWei(result[11])).toFixed(2);
            let tWhale = Number(web3.fromWei(result[9])).toFixed(2);
            let tBull = Number(web3.fromWei(result[12])).toFixed(2);
            let tBear = Number(web3.fromWei(result[10])).toFixed(2);
            let tEth = Number(web3.fromWei(result[9].toNumber()+result[10].toNumber()+result[11].toNumber()+result[12].toNumber())).toFixed(2);

            $('#tEth').html(tEth);
            $('#tSneak').html(tSneak);
            $('#tSneakP').html(Number((tSneak*100)/tEth).toFixed(2));
            $('#tWhale').html(tWhale);
            $('#tWhaleP').html(Number((tWhale*100)/tEth).toFixed(2));
            $('#tBull').html(tBull);
            $('#tBullP').html(Number((tBull*100)/tEth).toFixed(2));
            $('#tBear').html(tBear);
            $('#tBearP').html(Number((tBear*100)/tEth).toFixed(2));

            $('#aPot').html(Number(web3.fromWei(result[5])).toFixed(2));
            $('#tKeys').html(Number(web3.fromWei(result[2])).toFixed(2));
            relogio();
            getBuyPrice();
        }
        else{
            $('#aPot').html(error);
        }
    });
}
function getBuyPrice(){
    tokenContract.getBuyPrice(function(error, result){
        if(!error){
            $('#currP').html(Number(web3.fromWei(result)).toFixed(8));
            getPlayerInfoByAddress();
        }
        else{
            $('#currP').html(error);
        }
    });
}

function getPlayerInfoByAddress(){
    tokenContract.getPlayerInfoByAddress(web3.eth.defaultAccount, function(error, result){
        if(!error){

            let pName = web3.toAscii(result[1]).toString();

            if(result[1]!='0x0000000000000000000000000000000000000000000000000000000000000000') {
                $('#pName').html("<b>" + pName + "</b>");
            }
            else {
                $('#pName').html("user #<b>" + result[0].toNumber() + "</b>");
            }

            $('#kBal').html(Number(web3.fromWei(result[2].toNumber())).toFixed(2));

            let winnings = result[3];
            let exitScam = result[4];
            let badAdv = result[5];
            let totalDivs = Number(web3.fromWei(Number(exitScam)+Number(badAdv)+Number(winnings))).toFixed(6);
            if(totalDivs > 0.00009) {
                $("#btReinvest").show();
                $("#btWithdraw").show();
            }
            $('#aBalance').html(totalDivs);
            $('#wBalance').html(Number(web3.fromWei(winnings)).toFixed(6));
            $('#eBalance').html(Number(web3.fromWei(exitScam)).toFixed(6));
            $('#bBalance').html(Number(web3.fromWei(badAdv)).toFixed(6));
            $('#sEth').html(Number(web3.fromWei(result[6].toNumber())).toFixed(6));
            document.getElementById('updateFeedback').innerHTML="Updated @ " + moment().format("HH:mm:ss YYYY-MM-DD");
        }
        else{
            $('#kBal').html(error);
        }
    });

}
function reinvest(){
    gtag('event', 'see_f3d',{'event_category': 'click','event_label': 'F3D Reinvest'});
    location.href='https://exitscam.me/viriathus';
}
function withdraw(){
    if(!isMetaMask){
        gtag('event', 'see_f3d',{'event_category': 'click','event_label': 'F3D Withdraw without MM'});
        location.href='https://exitscam.me/viriathus';
    }
    else{

        $('#myModal').find('.modal-body').html('Would you like to withdraw all your outstanding earnings?' + notice);
        $('#myModal').modal('show');
        $("#btnModalConfirm").on("click", function(){
            $("#myModal").modal('hide');
            tokenContract.withdraw(function(error, result){
                if(!error){
                    gtag('event', 'withdraw_f3d',{'event_category': 'click','event_label': 'F3D Withdraw MM'});
                    alert("Transaction have been submitted to the Ethereum network!");
                }
                else{
                    gtag('event', 'withdraw_f3d',{'event_category': 'click','event_label': error});
                    console.log("Withdraw ERROR: "+ error);
                }
            });

        });
    }
}

function buyF3D(){
    if(!isMetaMask){
        location.href='https://exitscam.me/viriathus';
    }
    else{
        tokenContract.getBuyPrice(function(error, result){
            if(!error){
                $('#currP').html(Number(web3.fromWei(result)).toFixed(8));
                getPlayerInfoByAddress();
            }
            else{
                $('#currP').html(error);
            }
        });
        document.getElementById('tokenQuotation').innerHTML =" ≈ 0 F3D Keys";
        document.getElementById("ethToSpend").value='';
        $('#notice').html(notice);
        $('#myModal2').modal('show');

        $("#btnModalP3DConfirm").on("click", function(){
            let ethVal =  document.getElementById("ethToSpend").value;
            if(!isNaN(ethVal) && ethVal>0){
                var input = web3.toWei(ethVal,'ether');
                tokenContract.buyXname(affName, myTeam,{ value: input},function(error, result){
                    if(!error){
                        $("#myModal2").modal('hide');
                        gtag('event', 'buy_f3d',{'event_category': 'click','event_label': 'success'});
                        alert("Transaction have been submitted to the Ethereum network!");
                    }
                    else{
                        $("#myModal2").modal('hide');
                        gtag('event', 'buy_f3d',{'event_category': 'click','event_label': error});
                        console.log("Buy F3D ERROR: "+ error);
                    }
                });
            }
            else{
                document.getElementById('addressFeedback2').innerHTML = "Please insert a ETH value!";
            }
        });
    }
}

function updatePrice(){
    document.getElementById('addressFeedback2').innerHTML="";
    let ethVal =  document.getElementById("ethToSpend").value;
    if(isNaN(ethVal)){
        document.getElementById('addressFeedback2').innerHTML = "Please Insert a numerical value!";
    }
    else{
        let currP = Number(document.getElementById('currP').innerHTML);
        document.getElementById('tokenQuotation').innerHTML = " ≈ "+Number(ethVal/currP).toFixed(2)+" Keys"
    }
}
