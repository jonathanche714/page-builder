import write from 'write';
import fs from 'fs';

export default function handler(req, res) {
  if (req.method === 'POST') {
    if (req.body.platform === 'mobile') {
      write('apps/admin-nextjs/db/mobile.json', JSON.stringify(req.body), {
        overwrite: true,
      });
    } else {
      console.log(req.body);
      write('apps/admin-nextjs/db/index.json', JSON.stringify(req.body), {
        overwrite: true,
      });
    }
  } else {
    const jsonDesktop = fs.readFileSync('apps/admin-nextjs/db/index.json');
    const jsonMobile = fs.readFileSync('apps/admin-nextjs/db/mobile.json');

    const json = {
      desktop: JSON.parse(jsonDesktop),
      mobile: JSON.parse(jsonMobile),
    };

    res.status(200).json(json);
  }
}
