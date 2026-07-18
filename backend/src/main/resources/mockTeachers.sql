-- Create the Professor table
CREATE TABLE PROFESSOR (
    ID BIGINT AUTO_INCREMENT PRIMARY KEY,
    NOME VARCHAR(255) NOT NULL,
    INSCRICAO VARCHAR(255) NOT NULL,
    FOTO VARCHAR(500),
    UNIDADE VARCHAR(50),
    ENTRADA TIME,
    SAIDA TIME,
    ALMOCO_INICIO TIME,
    ALMOCO_FIM TIME,
    ATIVO INT
);

-- Insert mock data into the Professor table
INSERT INTO PROFESSOR (NOME, INSCRICAO, FOTO, UNIDADE, ENTRADA, SAIDA, ALMOCO_INICIO, ALMOCO_FIM, ATIVO) VALUES
('Ana Costa', '20261001001', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&h=240&fit=crop', '12', '07:30', '16:30', '11:30', '12:30', 1),
('Bruno Lima', '20261001002', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=240&h=240&fit=crop', '03', '13:00', '22:00', '18:00', '19:00', 0),
('Carla Mendes', '20261001003', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=240&h=240&fit=crop', '12', '08:00', '17:00', '12:00', '13:00', 2),
('Diego Fernandes', '20261001004', 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=240&h=240&fit=crop', '12', '09:00', '18:00', '13:00', '14:00', 0),
('Elisa Prado', '20261001005', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop', '03', '14:00', '23:00', '19:00', '20:00', 1),
('Felipe Araujo', '20261001006', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&h=240&fit=crop', '21', '07:00', '16:00', '11:00', '12:00', 1),
('Gabriela Nunes', '20261001007', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=240&h=240&fit=crop', '21', '10:00', '19:00', '14:00', '15:00', 1);