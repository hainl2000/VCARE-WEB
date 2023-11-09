import React, { useEffect, useState } from "react";
import { Button, Layout, Menu, Space } from "antd";
import styles from "./index.module.scss";
import {
  HistoryOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { deleteCookie, getCookie } from "cookies-next";
import router, { useRouter } from "next/router";
const { Header, Sider, Content } = Layout;
const ServiceDoctorLayout = ({
  children,
}: {
  children: any;
}) => {
  const [doctor, setDoctor] = useState<any>();
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    const doctorProfile = JSON.parse(
      getCookie("doctorProfile") as string
    );
    console.log(doctorProfile);

    setDoctor(doctorProfile);
  }, []);
  const router = useRouter();
  const handleLogout = () => {
    router.push("/doctor/login");
    deleteCookie("accessTokenDoctor");
    deleteCookie("doctorProfile");
  };
  const activeMenu = () => {
    switch (router.pathname) {
      case "/doctor/services/appointment":
        return ["1"];
      case "/doctor/services/history":
        return ["2"];
      // case "/doctor/service-management":
      //   return ["3"];
      default:
        return [];
    }
  };
  return (
    <Layout className={styles.managerLayout}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          //  borderRight: "1px solid rgba(0,0,0,0.1)",
          minWidth: "270px",
          // width: 270px;
        }}
      >
        <div className={styles.logo}>
          {!collapsed && (
            <div className={styles.logoWrapper}>
              <img
                src="/images/logo-vcare.png"
                style={{
                  width: "130px",
                  height: "130px",
                }}
              />
            </div>
          )}
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={activeMenu()}
          style={{
            height: "100vh",
            color: "white",
            marginTop: "20px",
            background: `linear-gradient(
            to right,
            #4fc58d,
            #48b392,
            #45a298
          )`,
          }}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,

              label: (
                <div
                  onClick={() => {
                    router.push(
                      "/doctor/services/appointment"
                    );
                  }}
                >
                  Dịch vụ khám
                </div>
              ),
            },
            {
              key: "2",
              icon: <HistoryOutlined />,
              label: (
                <div
                  onClick={() => {
                    router.push("/doctor/services/history");
                  }}
                >
                  Lịch sử khám
                </div>
              ),
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: "5px 15px",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {React.createElement(
              collapsed
                ? MenuUnfoldOutlined
                : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </div>
          {doctor && (
            <>
              <Space>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  {doctor?.full_name}
                </div>
                <Button
                  icon={<LogoutOutlined />}
                  danger
                  title="Đăng xuất"
                  onClick={handleLogout}
                ></Button>
              </Space>
            </>
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ServiceDoctorLayout;
