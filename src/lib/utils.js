import { clsx } from "clsx"
import { twMerge } from "tailwind-merge";
import qs from "qs";

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export function getStrapiURL() {
    return process.env.NEXT_PUBLIC_STRAPI_URL;
}

export function getStrapiMedia(url) {
    if (url == null) return null;
    if (url.startsWith("data:")) return url;
    if (url.startsWith("http") || url.startsWith("//")) return url;
    return `${getStrapiURL()}${url}`;
}

export async function getData(path, query = '', token = null) {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

    const url = new URL(path, baseUrl);
    url.search = query;

    const resOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    try {

        const res = await fetch(url.href, token && resOptions);

        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        console.log('data', data);
        return data;

    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export const giftsQuery = qs.stringify({
    populate: {
        featured_image: {
            fields: ['url']
        },
        image_gallery: {
            fields: ['url']
        },
        gift_categories: {
            fields: ['name']
        }
    }
});

export const clientQuery = qs.stringify({
    populate: {
        gifts: {
            populate: {
                featured_image: {
                    fields: ['url']
                },
            }
        },

        theme: {
            populate: {
                title: {
                    fields: ['text']
                },
                main_color_hex: {
                    fields: ['text']
                },
                secondary_color_hex: {
                    fields: ['text']
                },
                logo: {
                    fields: ['url']
                },
                decorator: {
                    fields: ['url']
                }
            }
        }
    }
});

export const userQuery = qs.stringify({
    populate: {
        gifts: {
            populate: {
                featured_image: {
                    fields: ['url']
                },
            }
        },
        user_logo: {
            fields: ['url']
        },
    }
});

export const eventQuery = qs.stringify({
    populate: {
        gifts: {
            populate: {
                featured_image: {
                    fields: ['url']
                },
            }
        },

        full_logo: {
            fields: ['url']
        },
        qr_logo: {
            fields: ['url']
        },

        theme: {
            populate: {
                title: {
                    fields: ['text']
                },
                main_color_hex: {
                    fields: ['text']
                },
                secondary_color_hex: {
                    fields: ['text']
                },
                logo: {
                    fields: ['url']
                },
                decorator: {
                    fields: ['url']
                }
            }
        }
    }
});