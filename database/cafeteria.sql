-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: cafeteria
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `idCliente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (2,'Juan Pérez García','8711234501','juan.perez@gmail.com'),(3,'María López Hernández','8711234502','maria.lopez@gmail.com'),(4,'Carlos Rodríguez Sánchez','8711234503','carlos.rodriguez@gmail.com'),(5,'Ana Martínez Flores','8711234504','ana.martinez@gmail.com'),(6,'Luis Gómez Torres','8711234505','luis.gomez@gmail.com'),(7,'Fernanda Ramírez Castillo','8711234506','fernanda.ramirez@gmail.com'),(8,'Diego Herrera Ruiz','8711234507','diego.herrera@gmail.com'),(9,'Valeria Castro Moreno','8711234508','valeria.castro@gmail.com'),(10,'José Mendoza Silva','8711234509','jose.mendoza@gmail.com'),(11,'Sofía Navarro Ortega','8711234510','sofia.navarro@gmail.com');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `idProducto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `precio` float NOT NULL,
  `imagen` varchar(150) NOT NULL,
  `idProveedor` int(11) NOT NULL,
  PRIMARY KEY (`idProducto`) USING BTREE,
  KEY `FK_productos_proveedores` (`idProveedor`),
  CONSTRAINT `FK_productos_proveedores` FOREIGN KEY (`idProveedor`) REFERENCES `proveedores` (`idProveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Coca Cola 600ml','Refresco sabor cola en botella de 600 ml.',22,'img/productos/1_Coca_Cola_600ml.png',1),(2,'Coca Cola Sin Azúcar 600ml','Refresco sin azúcar en botella de 600 ml.',22,'img/productos/2_Coca_Cola_Sin_Az__car_600ml.png',1),(3,'Chocolala 500ml','Leche saborizada a chocolate en envase de 500ml',24,'img/productos/Chocolala_500ml.png',2),(4,'Yoghurt Fresa Lala 220g','Yogurt líquido sabor fresa.',15,'img/productos/4_Yoghurt_Fresa_Lala_220g.png',2),(5,'Doritos nacho 58g','Botana de maíz nixtamalizado sabor queso chile.',20,'img/productos/Doritos_nacho_58g.png',8),(6,'Sabritas original 45g','Papas fritas con sal',20,'img/productos/6_Sabritas_original_45g.png',8),(7,'Sabritas Adobadas','Papas fritas sabor adobo',20,'img/productos/7_Sabritas_Adobadas.png',8),(8,'Ruffles Queso','Papas fritas onduladas sabor queso',20,'img/productos/8_Ruffles_Queso.png',8),(9,'Donitas Espolvoreadas 140g','Paquete de 8 piezas de donitas espolvoreadas',22,'img/productos/9_Donitas_Espolvoreadas_140g.png',4),(10,'Mantecadas Vainilla 188g','Paquete de 6 piezas de Mantecadas sabor Vainilla',32,'img/productos/10_Mantecadas_Vainilla_188g.png',4),(11,'Rebanadas 55g','Sándwich de pan tostado Bimbo con relleno cremoso de mantequilla',10,'img/productos/11_Rebanadas_55g.png',4),(12,'Cremax Vainilla 113g','Galletas tipo Wafer con Relleno sabor Vainilla',20,'img/productos/12_Cremax_Vainilla_113g.png',5),(13,'Emperador Senzo 117g','Galleta con relleno sabor Chocolate',22,'img/productos/13_Emperador_Senzo_117g.png',5),(14,'Floretinas Fresa 110g','Galletas con relleno sabor Fresa',22,'img/productos/14_Floretinas_Fresa_110g.png',5),(15,'Pepsi 600ml','Refresco sabor cola',20,'img/productos/15_Pepsi_600ml.png',6),(16,'Pepsi Black 600ml','Refresco sabor cola, sin calorías, sin azúcar',20,'img/productos/16_Pepsi_Black_600ml.png',6),(17,'Pepsi Kick 500ml','Refresco sabor cola, sin calorías, con cafeína',19,'img/productos/17_Pepsi_Kick_500ml.png',6),(18,'Santa Clara Vainilla 180ml','Leche semidescremada deslactosada ultrapasteurizada con sabor a helado de vainilla, adicionada con minerales y vitaminas, entre ellas A y D',12,'img/productos/Santa_Clara_Vainilla_180ml.png',7),(19,'Santa Clara Chocolate 180ml','Leche semidescremada deslactosada ultrapasteurizada con sabor a helado de chocolate, adicionada con minerales y vitaminas, entre ellas A y D',12,'img/productos/19_Santa_Clara_Chocolate_180ml.png',7),(20,'Santa Clara Fresa 180ml','Leche semidescremada deslactosada ultrapasteurizada con sabor a helado de fresa, adicionada con minerales y vitaminas, entre ellas A y D',12,'img/productos/20_Santa_Clara_Fresa_180ml.png',7),(21,'Sprite 600ml','Refresco sabor Lima-Limon',22,'img/productos/21_Sprite_600ml.png',1),(22,'Runners 72g','Botana de Maiz sabor salsa picante',18,'img/productos/22_Runners_72g.png',3),(23,'Chips sal 52g','Papas fritas y saladas',20,'img/productos/23_Chips_sal_52g.png',3),(24,'Takis Fuego 70g','Botana de Maíz sabor chile y limón',20,'img/productos/24_Takis_Fuego_70g.png',3);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proveedores` (
  `idProveedor` int(11) NOT NULL AUTO_INCREMENT,
  `nombreProveedor` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  PRIMARY KEY (`idProveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,'Coca‑Cola','800 704 4400','consumidor@coca-cola.com','Av. El Molino 1000, Tlajomulco de Zúñiga, Jalisco, México'),(2,'Grupo Lala','+52 871 123 4567','contacto@lala.com.mx','Torreón, Coahuila'),(3,'Barcel','+55 4746 9720','servicioalcliente@barcel.com.mx','Acatita de Baján 291, Parque Industrial Lagunero, 35077 Gómez Palacio, Durango.'),(4,'Grupo Bimbo','+52 871 567 8901','contactanos@grupobimbo.com','Ciudad de México'),(5,'Gamesa','+52 871 678 9012','atencionconsumidor@pepsico.com','Ciudad de México'),(6,'PepsiCo México','+52 871 789 0123','consumidor@pepsico.com','Ciudad de México'),(7,'Santa Clara','+52 871 901 2345','contacto@santaclara.com.mx','Pachuca, Hidalgo'),(8,'Sabritas','+52 871 876 54 32','atencion@sabritas.com.mx','Ciudad de México');
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-10 13:41:05
