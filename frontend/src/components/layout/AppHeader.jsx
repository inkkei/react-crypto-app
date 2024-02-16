import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useEffect, useState } from "react";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";
const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const AppHeader = () => {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [coin, setCoin] = useState(null);

  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
      return () => {
        document.removeEventListener("keypress", keypress);
      };
    };
    document.addEventListener("keypress", keypress);
  }, []);

  const handleSelect = (value) => {
    setModal(true);
    setCoin(crypto.find((c) => c.id === value));
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        onSelect={handleSelect}
        open={select}
        onClick={() => setSelect((prev) => !prev)}
        style={{
          width: 250,
        }}
        value="press / to open"
        optionLabelProp="label"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>

      <Drawer
        title="Basic Drawer"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
};

export default AppHeader;
