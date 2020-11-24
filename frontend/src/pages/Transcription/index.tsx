import React, { useState, FormEvent, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaTrash, FaPause, FaSave } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';
import SpeechRecognition,{ useSpeechRecognition } from 'react-speech-recognition';
import { Container, TextTranscript, ControlRec, Modal } from './styles';
import api from '../../services/api';
import logoMic from '../../assets/stonelogomic.png';
import { useToast } from '../../hooks/toast';

const Transcription: React.FC = () => {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const { startListening, stopListening } = SpeechRecognition;
  const { addToast } = useToast();
  const [title, setTitle] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);


  const handleShow= useCallback(() => {
    stopListening();
    setShow(true)
  },[stopListening]);

  const handleClose = useCallback(() => {
    stopListening();
    setShow(false);
  },[stopListening]);

  const handleClear = useCallback(() => {
    setTitle('');
    setType('');
  },[]);

  const handleSave = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/meetings', {
        transcription: transcript,
        type: type,
        title: title,
        date: new Date(),
      });

      resetTranscript();
      handleClear();
      resetTranscript();
      stopListening();
      handleClose();
      addToast({
        type: 'success',
        title: 'Reunião salva com sucesso!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao registrar a reunião!',
        description: 'Por favor procure o suporte!',
      });
    }
  },[addToast,stopListening,handleClear,resetTranscript,handleClose,title,transcript,type])

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    addToast({
      type: 'error',
      title: 'Browser não suportado',
      description: 'Por favor utilize o Google Chrome!',
    });
  }

  useEffect(()=>{
    Modal.setAppElement('body');
  },[])

  return (
        <Container>
          <header>
            <div>
              <Link to="/dashboard">
                <FiArrowLeft />
              </Link>
              <img src={logoMic} alt="RecMeeting" />
            </div>

          </header>
          <TextTranscript value={transcript} />

          <ControlRec>
              <button
                className={listening ? 'pisca' : ' '}
                type="button"
                onClick={() => {
                  if (listening) {
                    stopListening();
                  } else {
                    startListening({ language: 'pt-BR', continuous: true});
                  }
                }}
              >
                {listening ? (
                  <FaPause size={25} color="#FFFFFF" />
                ) : (
                  <FaPlay size={25} color="#FFFFFF" />
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (transcript) {
                    resetTranscript();
                    stopListening();
                  } else {
                  }
                }}
              >
                <FaTrash size={25} color="#FFFFFF" />
              </button>
              {transcript ? (
                <button type="button" onClick={() => handleShow()}>
                  <FaSave size={25} color="#FFFFFF" />
                </button>
              ) : (
                <button type="button" disabled>
                  <FaSave size={25} color="#FFFFFF" />
                </button>
              )}

              <Modal isOpen={show}>
              <form className="containerModal" onSubmit={handleSave}>
                <div className="titleModal">
                  <h3>Cadastro da Transcrição</h3>
                </div>
                <div className="bodyModel">
                  <input
                    type="text"
                    value={title}
                    placeholder="Titulo"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option selected value="">
                      Escolha um tipo de Reunião
                    </option>
                    <option value="report">Report</option>
                    <option value="sprint">Sprint</option>
                  </select>
                </div>
                <div className="footerModel">
                  <button type="button" onClick={handleClose}>
                    <GiCancel size={25} color="#22b24c" />
                  </button>
                  {title !== '' && type !== '' ? (
                    <button type="submit">
                      <FaSave size={25} color="#22b24c" />
                    </button>
                  ) : (
                    <button type="submit" disabled>
                      <FaSave size={25} color="#22b24c" />
                    </button>
                  )}
                </div>
              </form>
            </Modal>
          </ControlRec>
        </Container>
  );
}
export default Transcription;
