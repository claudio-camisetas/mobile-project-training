'use client'

import { useEffect, useState, createRef, LegacyRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Payment = () => {
  const [seconds, setSeconds] = useState(5 * 60)
  const inputRef: LegacyRef<HTMLInputElement> | undefined = createRef()
  const [paymentData, setPaymentData] = useState({
    qr_code: '',
    payment_link: ''
  })

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(countdownInterval)
          return prevSeconds
        }
        return prevSeconds - 1
      })
    }, 1000)
    return () => clearInterval(countdownInterval)
  }, [])

  useEffect(() => {
    const handleRequest = async () => {
      const response = await fetch('/api/payment')
      const data = await response.json()
      setPaymentData(data)
    }
    handleRequest()
  }, [])

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }

  const handleCopy = () => {
    toast.success('Código copiado com sucesso!', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    })
    navigator.clipboard.writeText(paymentData.payment_link)
  }

  return (
    <>
      <link rel='stylesheet' href='./payment.css' />
      <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap' rel='stylesheet' />
      <link rel='apple-touch-icon' href='https://cloudfox-digital-products.s3.amazonaws.com/uploads/user/2RmA83E5213PVpY/public/stores/DPVYB34NLLGKzkJ/logo/5HdXRVwApiTBYCoY8CVnKrD8TvMw4XdoqqOmhdno.png' />
      <link rel='icon' href='https://cloudfox-digital-products.s3.amazonaws.com/uploads/user/2RmA83E5213PVpY/public/stores/DPVYB34NLLGKzkJ/logo/5HdXRVwApiTBYCoY8CVnKrD8TvMw4XdoqqOmhdno.png' />
      <div className='thk-topbar' style={{ backgroundColor: '#fff', marginBottom: '10px', padding: 0 }}>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-11'>
              <img
                src='https://cloudfox-digital-products.s3.amazonaws.com/uploads/user/2RmA83E5213PVpY/public/stores/DPVYB34NLLGKzkJ/logo/5HdXRVwApiTBYCoY8CVnKrD8TvMw4XdoqqOmhdno.png'
                style={{ maxHeight: '44px', margin: '15px 0 15px 15px' }} />
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='ajax-loader'>
          <img style={{ width: '150px' }} src='https://pay.pagarsuacobranca.online/assets/gif/loading-gif-cloudfox.gif'
            className='img-responsive' />
          <span>Gerando novo Pix!</span>
        </div>
        <div className='d-md-none'>
          <div className='thk-topbar text-center '>
            <h1 className='thk-topbar-title'>Falta pouco! Para finalizar a compra, efetue o pagamento com PIX!</h1>
          </div>
          <div className='row no-gutters justify-content-center'>
            <div className='col-12' style={{ maxWidth: '650px' }}>
              <div className='card thanks'>
                <div className='content-pix content-pix-mobile col-12 text-center'>
                  <p className='countdown'> O código expira em: &nbsp; <span>{formatTime(seconds)}</span></p>
                  <div className='hr-horizontal-100'></div>
                  <p className='message-copie'> Copie a chave abaixo e utilize a opção  <br /> <span>PIX Copia e Cola:</span>
                  </p>
                  <input type='text' className='key-pix-input copy_digitable_line'
                    value={paymentData?.payment_link || 'Carregando...'}
                    readOnly />
                  <input id='key_pix_digitable_line' type='hidden'
                    value='00020101021226790014br.gov.bcb.pix2557brcode.starkinfra.com/v2/81f065d1539544d4960adf11d53d86935204000053039865802BR5925Suitpay Instituicao de Pa6007Goiania62070503***6304D07F'
                  />
                  <button
                    type='button'
                    id='copy_digitable_line'
                    className='btn buy-btn button-pix copy_digitable_line'
                    onClick={handleCopy}
                  >
                    <img src='https://pay.pagarsuacobranca.online/assets/img/copy.svg' />
                    COPIAR CÓDIGO
                  </button>
                </div>
              </div>
            </div>
            <div className='col-12 mt-0 pl-0 pr-0' style={{ maxWidth: '650px' }}>
              <div className='content-info text-left'>
                <p className='message-purchase d-block'> Valor a ser pago: &nbsp; <span>R$ 259,00</span></p>
                <div className='info-wrapper'>
                  <div className='collapse-button'>
                    <h2 className='info-title info-purchase'>
                      Instruções para pagamento
                    </h2>
                    <span className='d-block'><img src='https://pay.pagarsuacobranca.online/assets/img/down.svg' /></span>
                  </div>
                  <div className='hr-horizontal-100'></div>
                  <div id='info-card' className='d-none-fade'>
                    <div className='instructions-purchase'>
                      <span> <img src='https://pay.pagarsuacobranca.online/assets/img/app-indicator.svg' /></span>
                      <p>Após copiar o código, abra seu aplicativo de pagamento onde você utiliza o Pix.</p>
                    </div>
                    <div className='instructions-purchase'>
                      <span>
                        <img src='https://pay.pagarsuacobranca.online/assets/img/qr-code.svg' />
                      </span>
                      <p>Escolha a opção <span>PIX Copia e Cola</span> e insira o código copiado.</p>
                    </div>
                    <div className='instructions-purchase'>
                      <span>
                        <img src='https://pay.pagarsuacobranca.online/assets/img/check-circle-line-white.svg' />
                      </span>
                      <p>Confirme as informações e finalize sua compra.</p>
                    </div>
                  </div>
                </div>
                <div className='details-wrapper'>
                  <div className='collapse-button'>
                    <h2 className='info-title details-purchase'>Detalhes da compra:</h2>
                    <span className='d-block'><img src='https://pay.pagarsuacobranca.online/assets/img/down.svg' /></span>
                  </div>
                </div>
                <div className='clearfix'></div>
                <div className='soon-wrapper justify-content-center'>
                  <img src='https://pay.pagarsuacobranca.online/assets/img/soon-pix.svg' />
                  <div className='hr-vertical d-flex justify-content-center align-items-center align-self-center'></div>
                  <img src='https://pay.pagarsuacobranca.online/assets/img/safe-environment.svg' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='d-none d-md-block'>
          <div className='thk-topbar text-center '>
            <h1 className='thk-topbar-title'>Falta pouco! Para finalizar a compra, escaneie o QR Code abaixo.</h1>
          </div>
          <div className='clearfix'></div>
          <div className='row no-gutters justify-content-center'>
            <div className='col-12 col-md-6'>
              <div className='card thanks'>
                <div className='content-pix content-pix-web col-12 text-center'>
                  <p className='countdown'> O código expira em: &nbsp; <span>{formatTime(seconds)}</span></p>
                  <div className='hr-horizontal-100'></div>
                  {paymentData?.qr_code ? <img className='qrcode'
                    src={paymentData?.qr_code}
                    alt='QrCode Pix'
                  /> : <div className='loader-container'>
                    <span className="loader"></span>
                  </div>}
                  <div className='hr-horizontal-percentage'></div>
                  <p className='message-copie'> Se preferir, pague com a opção &nbsp; <span>PIX Copia e Cola:</span></p>
                  <input type='text' className='key-pix-input copy_digitable_line'
                    value={paymentData?.payment_link || 'Carregando...'}
                    readOnly />
                  <input id='key_pix_digitable_line' type='hidden'
                    ref={inputRef}
                    value='00020101021226790014br.gov.bcb.pix2557brcode.starkinfra.com/v2/81f065d1539544d4960adf11d53d86935204000053039865802BR5925Suitpay Instituicao de Pa6007Goiania62070503***6304D07F' />
                  <button
                    type='button'
                    id='copy_digitable_line'
                    className='btn buy-btn copy_digitable_line'
                    onClick={handleCopy}
                  >
                    <img src='https://pay.pagarsuacobranca.online/assets/img/copy.svg' />
                    COPIAR CÓDIGO
                  </button>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-6 col-lg-5 mt-0 pl-md-4 pl-lg-5 '>
              <div className='content-info text-left'>
                <p className='message-purchase d-block d-md-none order-0 '> Valor a ser pago: &nbsp; <span>R$
                    259,00</span></p>
                <div className='details-wrapper mt-md-0 order-2 order-md-0'>
                  <div className='collapse-button pointer-events-none'>
                    <h2 className='info-title details-purchase'>Detalhes da compra:</h2>
                    <span className='d-block d-md-none'><img
                        src='https://pay.pagarsuacobranca.online/assets/img/down.svg' /></span>
                  </div>
                  <div className='hr-horizontal-100'></div>
                  <p className='message-purchase text-left d-none d-md-block'> Valor total: &nbsp; <span>R$
                      259,00</span></p>
                  <div id='details-card' className='d-none-fade-web'>
                    <div className='product-content asScrollable is-enabled asScrollable-horizontal'
                      data-options='{&quot;direction&quot;: &quot;horizontal&quot;, &quot;contentSelector&quot;: &quot;>&quot;, &quot;containerSelector&quot;: &quot;>&quot;}'
                      style={{ position: 'relative' }}>
                    </div>
                  </div>
                  <div className='info-wrapper order-1 order-md-1'>
                    <div className='collapse-button pointer-events-none'>
                      <h2 className='info-title info-purchase'>
                        Instruções para pagamento
                      </h2>
                      <span className='d-block d-md-none'><img
                          src='https://pay.pagarsuacobranca.online/assets/img/down.svg' /></span>
                    </div>
                    <div className='hr-horizontal-100'></div>
                    <div id='info-card' className='d-none-fade-web'>
                      <div className='instructions-purchase'>
                        <span> <img src='https://pay.pagarsuacobranca.online/assets/img/app-indicator.svg' /></span>
                        <p>Abra o app do seu banco e entre no ambiente Pix</p>
                      </div>
                      <div className='instructions-purchase'>
                        <span> <img src='https://pay.pagarsuacobranca.online/assets/img/qr-code.svg' /></span>
                        <p>Escolha <span>Pagar com QR Code</span> e aponte a câmera para o código ao lado.</p>
                      </div>
                      <div className='instructions-purchase'>
                        <span> <img src='https://pay.pagarsuacobranca.online/assets/img/check-circle-line-white.svg' /></span>
                        <p>Confirme as informações e finalize sua compra.</p>
                      </div>
                    </div>
                  </div>
                  <div className='clearfix clearfix-auto order-4'></div>
                  <div className='hr-horizontal-100 d-none d-md-block order-5'></div>
                </div>
              </div>
            </div>
          </div>
          <div className='half'></div>
          <div className='clearfix'></div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Payment
