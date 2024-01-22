import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function TokenVerify(): JSX.Element {
  const router = useRouter();

  async function fetchs(): Promise<void> {
    const { token, reset } = router.query;
    console.log(token);

    if (!reset) {
       let location=window.location.href
    const lastSlashIndex = location.lastIndexOf('/');
let finalUrl=location.substring(0, lastSlashIndex);
      await fetch('api/adduser', {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          isVerify: true,
          url:finalUrl
        }),
      });
      router.push('/loginbyemail');
    } else {
       let location=window.location.href
    const lastSlashIndex = location.lastIndexOf('/');
let finalUrl=location.substring(0, lastSlashIndex);
      await fetch('api/checkuser', {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          isVerify: false,
          reset: false,
          url:finalUrl
        }),
      }).then((res) => {
        res.json().then(async (ans) => {
          await fetch('api/changepassword', {
            method: 'POST',
            body: JSON.stringify({
              _id: ans,
            }),
          });
        });
      });
    }
  }

  return (
    <div className="h-[100vh] w-[80vw] flex justify-center items-center flex-col">
      <p>Click on the button To verify Your Email</p>
      <button onClick={fetchs} className="bg-aqua w-[150px] h-[50px]">
        Click me
      </button>
    </div>
  );
}
