import whatsappIcon from './floating-whatsapp.png';

const WhatsappButton = () => {
	return (
		<a href='https://api.whatsapp.com/send?phone=+543516062623&text=Hola%20vengo%20del%20sitio%20web%20quiero%20consultarles:%20' target='_blank' className='floating-whatsapp--img-container'>
			<img src={whatsappIcon} alt='whatsapp icon' />
		</a>
	);
};

export default WhatsappButton;