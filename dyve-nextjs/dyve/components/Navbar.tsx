            "use client";
            import { Button, buttonVariants } from "@/components/ui/button";
            import { usePathname } from "next/navigation";
            import Link from "next/link";
            import Image from "next/image";
            import React, { useEffect } from 'react';
            import "./navbar.css"

            const Navbar = () => {
              const pathname = usePathname();
              console.log(pathname);

                useEffect(() => {
                    
                    const addScript = document.createElement('script');
                  
                    addScript.setAttribute('src', 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
                  
                    document.body.appendChild(addScript);

                
                    window.googleTranslateElementInit = googleTranslateElementInit;

                  
                    return () => {
                        document.body.removeChild(addScript);
                    };
                }, []);
              
                const googleTranslateElementInit = () => {
                
                    new window.google.translate.TranslateElement({
                        pageLanguage: 'en',
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    }, 'google_translate_element');
                };

            

              return (
                <div className="flex w-full flex-row items-center justify-between">
                    <Image src="/assets/logo.png" width={90} height={30} alt="Dyve logo" />
                  <div className="bg-black-background-2 flex w-8/12 flex-row items-center justify-between rounded-lg py-2">
                  
                    <Link
                      href={"/"}
                      className={buttonVariants({
                        variant: pathname === "/" ? "activeLink" : "inActiveLink",
                      })}
                    >
                      Home
                    </Link>

                    <Link
                      href={"/about"}
                      className={buttonVariants({
                        variant: pathname.includes("/about")
                          ? "activeLink"
                          : "inActiveLink",
                      })}
                    >
                      About
                    </Link>

                    <Link
                      href={"/micro-loan"}
                      className={buttonVariants({
                        variant: pathname.includes("/micro-loan")
                          ? "activeLink"
                          : "inActiveLink",
                      })}
                    >
                      Micro Loan
                    </Link>

                    <Link
                      href={"/savings"}
                      className={buttonVariants({
                        variant: pathname.includes("/savings")
                          ? "activeLink"
                          : "inActiveLink",
                      })}
                    >
                      Savings
                    </Link>
                      
                    <Link
                      href={"/academy"}
                      className={buttonVariants({
                        variant: pathname.includes("/academy")
                          ? "activeLink"
                          : "inActiveLink",
                      })}
                    >
                      Academy
                    </Link>
                  </div>
                    <div id="google_translate_element" className="">
                    </div>

                  <div>
                    <Button variant={"heroBtn"}>Register</Button>
                  </div>
                </div>
              );
            };

            export default Navbar;
