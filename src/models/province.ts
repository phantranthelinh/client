export type Province = {
  _id: string;
  name: string;
  code: number;
  codename: string;
  division_type: string;
  phone_code: number;
};
export type Ward = {
  name: string;
  _id: string;

  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
  district_code: number;
};

export type District = {
  name: string;
  _id: string;

  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
  province_code: number;
};
