import Head from "next/head";
import Image from "next/image";
import { ReactNode } from "react";
import { Navbar } from "@nextui-org/react";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
  email?: string;
}

export default function Layout(props: Props) {
  const { children } = props;
  const { pathname } = useRouter();

  return (
    <div>
      <Head>
        <title>Karnataka State Police - ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್</title>
        <meta
          name="description"
          content="Unleash the power of crypto and fiat with our all-in-one bank account"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Navbar>
            <Navbar.Brand>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="logo-container">
                  <Image src="/icon.png" width={80} height={80} alt="Karnataka State Police - ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್" />
                </div>
                <div style={{ marginLeft: '10px', textAlign: 'left' }}>
                  <h1 style={{ fontWeight: 'bold', fontSize: '24px', lineHeight: '30px', marginLeft: '50px' }}>Karnataka State Police</h1>
                  <h1 style={{ fontWeight: 'bold', fontSize: '24px', lineHeight: '30px', marginLeft: '25px' }}>ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್</h1>
                </div>
              </div>
            </Navbar.Brand>
            <Navbar.Content hideIn="xs">
              {pathname !== "/" &&
                pathname !== "/signup" &&
                pathname !== "/login" && (
                  <>
                    <Navbar.Link isActive={pathname == "/account"} href="/account">
                      Account: {props.email}
                    </Navbar.Link>
                  </>
                )}
            </Navbar.Content>
          </Navbar>
          {children}
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <div style={{
            width: '400px',
            height: '500px',
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundImage: `url('/pic.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            <div style={{
              backgroundColor: 'rgba(103,160,107,0.9)',  // Changed to a green filter
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',  // Adjusted to space elements
              alignItems: 'center',
              color: 'white',
              padding: '2rem',
              position: 'relative'  // Added for absolute positioning of text
            }}>
              <h2 style={{ fontSize:'20px' , position: 'absolute', top: '1rem', right: '2rem', fontWeight: 'bold' }}>
                Team: Data Rangers
              </h2>
              <p style={{ fontSize:'19px' , position: 'absolute', bottom: '1rem', right: '2rem', textAlign: 'right' }}>
              Optimizing<br></br>Police Efficiency<br></br> for Safer Communities <br></br>Every Day
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
