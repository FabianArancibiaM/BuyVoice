export interface IInfoCardMenu {
    title: string;
    children: IInfoCardSubMenu[];
}

export interface IInfoCardSubMenu {
    title: string;
    url: string;
}
