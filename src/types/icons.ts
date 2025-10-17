import type { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react';

export type IconType = ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & {
        title?: string | undefined;
        titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
>;