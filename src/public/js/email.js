const email = (from, to, mens, reply) =>{

    var templateParams = {
        from_name: from,
        to_name: to,
        message: mens,
        reply_to: reply
    };
 
    emailjs.send('service_2zzoy7s', 'template_d3qspir', templateParams,'-zQvYzy9vRabCeWgi')
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alertMensaje("Mail enviado !!!");
        }, function(error) {
            console.log('FAILED...', error);
            alertMensaje("No se pudo enviar el mail !!!!!, comuniquese con el administrador de sistema");
        });

}