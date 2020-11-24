import React, { useEffect, useState , FormEvent, useCallback} from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiPower } from 'react-icons/fi';
import { FaUserAlt,FaRegCalendarAlt,FaPencilAlt,FaRegTrashAlt, FaMicrophone, FaSave } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import {GoGraph} from 'react-icons/go';

import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  ListCard,
  Menu,
  Modal
} from './styles';
import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/stonelogo.png';
import baseAvatar from '../../assets/baseAvatar.png';
import logoWhite from '../../assets/stonelogobranco.png';
import maquininha from '../../assets/maquininha.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
interface IMeetingData {
  id: string;
  title: string;
  transcription: string;
  type: string;
  date: string;
  dateFormatted: string;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const { addToast } = useToast();
  const [meetings, setMeetings] = useState<IMeetingData[]>([]);
  const [titleModal, setTitleModal] = useState<string>('');
  const [typeModal, setTypeModal] = useState<string>('');
  const [textModal, setTextModal] = useState<string>('');
  const [idModal, setIdModal] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);

  const handleShow= useCallback(({id, title , transcription, type}) => {
    setTitleModal(title);
    setTypeModal(type);
    setTextModal(transcription);
    setIdModal(id);
    setShow(true)
  },[]);

  const handleClose = useCallback(() => {
    setShow(false);
  },[]);

  const handleUpdate= useCallback(async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/meetings`, {
        transcription: textModal,
        meeting_id: idModal,
        title: titleModal,
        type: typeModal,
      });
      addToast({
        type: 'success',
        title: 'Reunião atualizada com sucesso!',
      });
      handleClose();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Ocorreu um erro ao tentar atualizar a reunião!',
      });
    }
  },[addToast,handleClose,idModal,textModal,titleModal,typeModal]);

  const handleDeleteCard = useCallback(async (id: string) => {
    try {
      await api.delete(`/meetings/${id}`);
      setMeetings(meetings.filter((meeting) => meeting.id !== id));
      addToast({
        type: 'success',
        title: 'Registro deletado com sucesso!',
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Ocorreu um erro ao tentar apagar a reunião!',
      });
    }
  },[addToast, meetings])


  useEffect(() => {
   api.get<IMeetingData[]>('/meetings').then((response)=> {
    const meetingsFormatted = response.data.map(meeting=> {
      meeting.dateFormatted = format(parseISO(meeting.date), "'Dia' dd 'de' MMMM", {
        locale: ptBR,
      });
      return meeting
    });
    setMeetings(meetingsFormatted);
   })
   Modal.setAppElement('body');
  }, [meetings]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Stone" />

          <Profile>
            {user.avatar_url ?
              <img src={user.avatar_url} alt={user.name} />
              :
              <img src={baseAvatar} alt='Stone' />
            }

            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <Menu>
            <Link to="/transcription">
              <FaMicrophone size={32} color="#22b24c" />
            </Link>
            <Link to="/metrics">
              <GoGraph size={32} color="#22b24c" />
            </Link>
            <button type="button" onClick={signOut}>
              <FiPower size={32} color="#22b24c" />
            </button>
          </Menu>
        </HeaderContent>
      </Header>

      <Content>

      <ListCard>
      {meetings.map((meeting) => (
          <li key={meeting.id}>
            <div className="headCard">
              <strong>{meeting.title}</strong>
              <img src={maquininha} alt="maquininha"/>
            </div>
            <div className="bodyCard">
              <div className="sectionOwner">
                <div className="owner">
                  <FaUserAlt size={20} color="#a8a8b3" />
                  <p>{user.name}</p>
                </div>
                <div className="date">
                  <FaRegCalendarAlt size={20} color="#a8a8b3" />
                  <p>{meeting.dateFormatted}</p>
                </div>
              </div>
              <div className="sectionButtons">
                <button onClick={() => handleShow(meeting)} type="button">
                  <FaPencilAlt size={20} color="#a8a8b3" />
                </button>
                <button onClick={() => handleDeleteCard(meeting.id)} type="button">
                  <FaRegTrashAlt size={20} color="#a8a8b3" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ListCard>
      <Modal isOpen={show}>
        <form className="containerModal" onSubmit={handleUpdate}>
          <div className="bodyModel">
            <div className="bodyBoxSelect">
              <img src={logoWhite} alt="Stone"/>
              <div className="BoxElement">
                <strong>Titulo:</strong>
                <input
                  value={titleModal}
                  placeholder="Titulo"
                  onChange={(e) => setTitleModal(e.target.value)}
                />
              </div>
              <div className="BoxElement">
                <strong>Tipo:</strong>
                <select
                  value={typeModal}
                  onChange={(e) => setTypeModal(e.target.value)}
                >
                  <option selected value="">
                      Escolha um tipo de Reunião
                    </option>
                  <option value="report">Report</option>
                  <option value="sprint">Sprint</option>
                </select>
              </div>
            </div>
            <textarea
              defaultValue={textModal}
              onChange={(e) => setTextModal(e.target.value)}
            />
          </div>
          <div className="footerModel">
            <button type="button" onClick={handleClose}>
              <GiCancel size={25} color="#22b24c" />
            </button>
            {titleModal !== '' ? (
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
      </Content>
    </Container>
  );
};

export default Dashboard;
