import React, { useState, useEffect } from 'react';
import { Truck, Package, Shield, MapPin, Clock, CheckCircle, Mail, Phone, MapPinIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import toast from 'react-hot-toast';
import { companyInfo } from '../mock';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.detail?.message 
        || error.response?.data?.message 
        || "Niečo sa pokazilo. Skúste to prosím znova.";
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="logo-text text-2xl font-semibold tracking-tight">
              Fenji <span className="text-gray-400">Slovakia</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">O nás</a>
              <a href="#services" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Služby</a>
              <a href="#transport-terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Prepravný poriadok</a>
              <a href="#contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Kontakt</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                <span className="inline-block animate-fade-in">Spoľahlivá</span>
                <br />
                <span className="inline-block animate-fade-in-delay text-gray-400">preprava po celej EU</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fade-in-delay-2">
                Profesionálne prepravné služby dodávkovými vozidlami do 3,5 tuny. Rýchlo, bezpečne a efektívne.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-3">
                <Button size="lg" className="text-base px-8 py-6 rounded-full hover-lift" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                  Získať cenovú ponuku
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-full hover-lift" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
                  Zistiť viac
                </Button>
              </div>
            </div>
            
            {/* Right Image */}
            <div className={`relative transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="hero-image-wrapper relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://customer-assets.emergentagent.com/job_eu-delivery/artifacts/if0u6r9l_doda%CC%81vky2.jpeg" 
                  alt="FENJI Slovakia dodávky" 
                  className="w-full h-auto object-cover hero-image"
                />
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
              </div>
              {/* Decorative element */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gray-100 rounded-3xl blur-3xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold tracking-tight">O nás</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                FENJI Slovakia s.r.o. je moderná dopravná spoločnosť špecializujúca sa na prepravu tovaru v rámci Európskej únie. Naše plachtové dodávky do 3,5 tuny zabezpečujú flexibilnú a efektívnu prepravu pre široké spektrum klientov.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                S dôrazom na spoľahlivosť, bezpečnosť a profesionalitu poskytujeme komplexné prepravné služby prispôsobené potrebám našich zákazníkov.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="feature-card bg-white p-6 rounded-2xl hover-lift">
                <Shield className="w-10 h-10 mb-4 text-gray-900" />
                <h3 className="font-semibold mb-2">100% spoľahlivosť</h3>
                <p className="text-sm text-gray-600">Garantujeme bezpečnú prepravu</p>
              </div>
              <div className="feature-card bg-white p-6 rounded-2xl hover-lift">
                <MapPin className="w-10 h-10 mb-4 text-gray-900" />
                <h3 className="font-semibold mb-2">Celá EU</h3>
                <p className="text-sm text-gray-600">Prepravujeme po celom území</p>
              </div>
              <div className="feature-card bg-white p-6 rounded-2xl hover-lift">
                <Clock className="w-10 h-10 mb-4 text-gray-900" />
                <h3 className="font-semibold mb-2">Rýchle dodanie</h3>
                <p className="text-sm text-gray-600">Včasné doručenie zásielok</p>
              </div>
              <div className="feature-card bg-white p-6 rounded-2xl hover-lift">
                <CheckCircle className="w-10 h-10 mb-4 text-gray-900" />
                <h3 className="font-semibold mb-2">Profesionalita</h3>
                <p className="text-sm text-gray-600">Kvalifikovaný personál</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold tracking-tight mb-4">Naše služby</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ponúkame komplexné prepravné riešenia prispôsobené vašim potrebám
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="service-card bg-white border border-gray-200 rounded-3xl p-8 hover-lift">
              <div className="mb-6">
                <Truck className="w-12 h-12 text-gray-900" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Preprava nákladu</h3>
              <p className="text-gray-600 mb-6">
                Preprava paletizovaného tovaru, papierových kotúčov, farieb a ďalších typov tovaru dodávkovými vozidlami.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Vozové zásielky
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Kusové zásielky
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Dokládky
                </li>
              </ul>
            </div>
            <div className="service-card bg-white border border-gray-200 rounded-3xl p-8 hover-lift">
              <div className="mb-6">
                <Package className="w-12 h-12 text-gray-900" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Medzinárodná preprava</h3>
              <p className="text-gray-600 mb-6">
                Medzinárodná cestná nákladná doprava v rámci celého územia Európskej únie s plachtovými dodávkami.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Všetky krajiny EU
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Rýchle colné vybavenie
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Sledovanie zásielok
                </li>
              </ul>
            </div>
            <div className="service-card bg-white border border-gray-200 rounded-3xl p-8 hover-lift">
              <div className="mb-6">
                <Shield className="w-12 h-12 text-gray-900" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Bezpečná preprava</h3>
              <p className="text-gray-600 mb-6">
                Preprava nebezpečných vecí v súlade s ADR dohodou a všetkými platnými predpismi pre bezpečnú prepravu.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  ADR certifikácia
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Bezpečnostný poradca
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Plná zodpovednosť
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Transport Terms Section */}
      <section id="transport-terms" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold tracking-tight mb-4">Prepravný poriadok</h2>
            <p className="text-lg text-gray-600">
              Všeobecné prepravné podmienky cestnej nákladnej dopravy
            </p>
          </div>
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="px-8 py-6 text-xl font-semibold hover:no-underline">
                  Zobraziť prepravný poriadok
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-8">
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">PREPRAVNÝ PORIADOK CESTNEJ NÁKLADNEJ DOPRAVY</h3>
                      <p className="font-semibold mb-2">FENJI Slovakia s.r.o.</p>
                      <p>Ihrište 10, Púchov 020 01</p>
                      <p>IČO: 54 122 929</p>
                      <p className="mt-4 italic">Platnosť od: 01.08.2025</p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold mb-3">Oddiel I - Základné ustanovenia</h4>
                      
                      <h5 className="font-semibold mt-4 mb-2">Článok 1: Úvodné ustanovenia</h5>
                      <p className="mb-2">
                        Tento prepravný poriadok obsahuje prepravné podmienky dopravcu potrebné pre uzavretie prepravnej zmluvy.
                      </p>
                      <p className="mb-2">
                        Dopravcom podľa tohto prepravného poriadku je <strong>FENJI Slovakia s.r.o.</strong>, Ihrište 10, Púchov 020 01, IČO: 54 122 929, ktorá poskytuje služby cestnej nákladnej dopravy.
                      </p>
                      <p>
                        Prepravou sa rozumie premiestnenie tovaru, nákladu, priemyselných výrobkov a iných požadovaných druhov vecí v medzinárodnej a vnútroštátnej cestnej nákladnej doprave.
                      </p>

                      <h5 className="font-semibold mt-4 mb-2">Článok 2: Druh prevádzkovanej cestnej dopravy</h5>
                      <p className="mb-2">Dopravca prevádzkuje nákladnú cestnú dopravu v rámci nasledovného rozsahu:</p>
                      <ul className="list-disc pl-6 space-y-1 mb-2">
                        <li>Vnútroštátna cestná nákladná doprava</li>
                        <li>Medzinárodná cestná nákladná doprava</li>
                      </ul>
                      <p className="mb-2">Charakter vykonávanej nákladnej cestnej dopravy:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Vozové zásielky (plné náklady)</li>
                        <li>Kusové zásielky (čiastočné náklady)</li>
                      </ul>

                      <h5 className="font-semibold mt-4 mb-2">Článok 3: Vymedzenie prepravovaných vecí</h5>
                      <p className="mb-2">
                        Dopravca prednostne prepravuje vozové zásielky, ale podujíma sa aj na prepravy kusových zásielok.
                      </p>
                      <p className="mb-2">Typy prepráv podľa technickej základne:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Preprava paletizovaného tovaru</li>
                        <li>Preprava papierových kotúčov</li>
                        <li>Preprava farieb</li>
                        <li>Preprava nebezpečných vecí</li>
                        <li>Preprava iných druhov tovaru podľa objednávky odosielateľa</li>
                      </ul>

                      <h5 className="font-semibold mt-4 mb-2">Článok 4: Veci vylúčené z prepravy</h5>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Veci, ktorých preprava je zakázaná všeobecne záväznými právnymi predpismi</li>
                        <li>Nebezpečné veci triedy 1 (výbušné látky), 6.1 (jedovaté látky), 6.2 (infekčné látky), triedy 7 (rádioaktívny materiál), triedy 8 (žieravé látky) podľa ADR dohody</li>
                        <li>Veci vysokej hodnoty alebo ťažko vyčísliteľnej hodnoty (umelecké zbierky, starožitnosti, atď.)</li>
                        <li>Živé zvieratá</li>
                        <li>Nadrozmerné a nadváhové prepravy</li>
                      </ul>

                      <h5 className="font-semibold mt-4 mb-2">Článok 5: Podmienky pristavovania vozidiel</h5>
                      <p className="mb-2">
                        Dopravca, ako aj odosielatelia a zasielatelia zabezpečia, aby zmluvne dohodnuté prepravné termíny boli v súlade s nariadením (ES) č. 561/2006 o harmonizácii určitej sociálnej legislatívy týkajúcej sa cestnej dopravy.
                      </p>
                      <p className="mb-2">
                        Pre zásielky, ktoré svojou povahou vyžadujú ochranu pred poškodením alebo stratou pri preprave a manipulácii, je odosielateľ povinný predložiť ich na prepravu v riadnom obale zodpovedajúcom podmienkam cestnej dopravy.
                      </p>
                      <p>
                        Nakladanie je všeobecne zabezpečované odosielateľom a vykladanie príjemcom zásielky, pokiaľ nie je dohodnuté inak s dopravcom.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold mb-3">Oddiel II - Zmluva o preprave vecí</h4>
                      
                      <h5 className="font-semibold mt-4 mb-2">Článok 6: Základné ustanovenie</h5>
                      <p className="mb-2">
                        Ak právnická osoba objedná prepravu u dopravcu a uzavrie sa prepravná zmluva, spravuje sa ustanoveniami §§ 610-629 o zmluve o preprave vecí podľa zákona č. 513/1991 Zb., Obchodný zákonník.
                      </p>
                      <p>
                        Zmluvou o preprave vecí sa dopravca zaväzuje odosielateľovi prepraviť vec (zásielku) z určitého miesta (miesta odoslania) na iné určité miesto (miesto určenia) a odosielateľ sa zaväzuje zaplatiť mu odmenu (fracht).
                      </p>

                      <h5 className="font-semibold mt-4 mb-2">Článok 7: Povinnosti objednávateľa prepravy</h5>
                      <p className="mb-2">
                        Objednávateľ prepravy je povinný poskytnúť dopravcovi správne údaje o obsahu a povahe zásielky a zodpovedá za škodu, ktorú dopravcovi spôsobí porušením tejto povinnosti.
                      </p>
                      <p className="mb-2">
                        Prepravná objednávka musí obsahovať údaje potrebné pre realizáciu prepravy a vystavenie faktúry podľa platnej legislatívy:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Obchodné meno objednávateľa, adresu, IČO, DIČ, email, telefón</li>
                        <li>Údaje o zásielke (druh, hrubá hmotnosť, počet kusov, rozmery, požiadavky na zabezpečenie)</li>
                        <li>Miesto odoslania a miesto určenia zásielky</li>
                        <li>Dohodnutá odmena za prepravu</li>
                      </ul>

                      <h5 className="font-semibold mt-4 mb-2">Článok 8: Zodpovednosť dopravcu</h5>
                      <p className="mb-2">
                        Dopravca zodpovedá za úplnú alebo čiastočnú stratu zásielky, alebo za jej poškodenie, ktoré vznikne od okamihu prevzatia zásielky na prepravu až do jej odovzdania, ako aj za prekročenie dodacej lehoty.
                      </p>
                      <p>
                        Dopravca je zbavený tejto zodpovednosti, ak strata zásielky, jej poškodenie alebo prekročenie dodacej lehoty bolo spôsobené oprávnenou osobou, príkazom oprávnenej osoby, vlastnou chybou zásielky alebo okolnosťami, ktorým dopravca nemôže zabrániť.
                      </p>

                      <h5 className="font-semibold mt-4 mb-2">Článok 9: Podmienky zmeny prepravnej zmluvy</h5>
                      <p className="mb-2">
                        Až do odovzdania zásielky môže odosielateľ požadovať, aby sa preprava prerušila a zásielka mu bola vrátená, alebo aby sa s ňou inak naložilo dohodou s dopravcom.
                      </p>
                      <p>
                        Príjemca zásielky môže navrhnúť, aby bola zásielka dodaná na inom mieste vykladania.
                      </p>

                      <h5 className="font-semibold mt-4 mb-2">Článok 10: Prepravné listiny</h5>
                      <p className="mb-2">
                        Prepravná listina ako prepravný doklad sprevádza zásielku až do jej odovzdania alebo nakladania s ňou.
                      </p>
                      <p>
                        Prepravná listina musí obsahovať minimálne nasledovné údaje:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Meno (totožnosť) odosielateľa a príjemcu</li>
                        <li>Obvyklé označenie obsahu zásielky a jej balenia</li>
                        <li>Počet kusov</li>
                        <li>Celkovú hmotnosť zásielky</li>
                        <li>Miesto nakladania a miesto vykladania</li>
                        <li>Dátum a potvrdenie prevzatia zásielky dopravcom a príjemcom</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold mb-3">Oddiel III - Preprava nebezpečných vecí</h4>
                      
                      <h5 className="font-semibold mt-4 mb-2">Článok 11: Základné ustanovenie</h5>
                      <p className="mb-2">
                        Cestnou dopravou môžu byť prepravované iba nebezpečné veci, ktorých preprava je dovolená medzinárodnou zmluvou, ktorou je Slovenská republika viazaná (Európska dohoda o medzinárodnej cestnej preprave nebezpečných vecí - ADR dohoda).
                      </p>
                      <p>
                        Dopravca má vymenovaného jedného bezpečnostného poradcu, má potrebnú technickú základňu, vozidlá a prepravné zariadenia a posádky vozidiel boli vyškolené bezpečnostným poradcom.
                      </p>

                      <h5 className="font-semibold mt-4 mb-2">Článok 12: Povinnosti odosielateľa nebezpečných vecí</h5>
                      <p className="mb-2">Odosielateľ nebezpečných vecí je povinný:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Predložiť na prepravu zásielku nebezpečných vecí, ktorá je v súlade s požiadavkami tohto zákona</li>
                        <li>Zabezpečiť, aby boli nebezpečné veci správne zatriedené</li>
                        <li>Poskytnúť dopravcovi informácie a údaje</li>
                        <li>Používať iba obaly, nádrže a kontajnery schválené pre prepravu príslušných látok</li>
                        <li>Dodržiavať predpisy o spôsobe odoslania</li>
                      </ul>

                      <h5 className="font-semibold mt-4 mb-2">Článok 13: Povinnosti dopravcu</h5>
                      <p className="mb-2">Dopravca je povinný zabezpečiť prepravu nebezpečných vecí v súlade s požiadavkami zákona č. 56/2012 Z.z., najmä:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Overiť, že nebezpečné veci určené na prepravu sú dovolené na prepravu</li>
                        <li>Overiť, že odosielateľ poskytol predpísané informácie</li>
                        <li>Overiť, že predpísané doklady sú prítomné v prepravnej jednotke</li>
                        <li>Vizuálne overiť, že vozidlo a náklad nemajú viditeľné poškodenia</li>
                        <li>Overiť, že vozidlo nie je preťažené</li>
                        <li>Overiť, že bezpečnostné nálepky sú umiestnené na vozidle</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold mb-3">Oddiel IV - Záverečné ustanovenia</h4>
                      
                      <h5 className="font-semibold mt-4 mb-2">Článok 14: Reklamačné konanie</h5>
                      <p>
                        Reklamačné lehoty a premlčacie lehoty pre uplatnenie nárokov odosielateľa alebo príjemcu vyplývajúcich z prepravnej zmluvy s dopravcom sú uvedené pre vnútroštátnu cestnú nákladnú dopravu vykonávanú v SR v Obchodnom zákonníku a Občianskom zákonníku.
                      </p>

                      <h5 className="font-semibold mt-4 mb-2">Článok 15: Zverejnenie a platnosť</h5>
                      <p className="mb-2">
                        Podľa zákona NR SR č. 56/2012 Z.z. o cestnej doprave dopravca zverejnil tento prepravný poriadok na svojom webovom sídle a je k dispozícii aj na sídle dopravcu.
                      </p>
                      <p>
                        Tento prepravný poriadok je platný od <strong>01.08.2025</strong>.
                      </p>

                      <h5 className="font-semibold mt-4 mb-2">Článok 16: Zmeny v prepravnom poriadku</h5>
                      <p>
                        Všetky zmeny a doplnky prepravného poriadku sú platné odo dňa ich zverejnenia a sprístupnenia na webovom sídle dopravcu.
                      </p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <p className="text-sm text-gray-500 italic">
                        V Púchove, dňa 01.08.2025
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-5xl font-bold tracking-tight mb-6">Kontaktujte nás</h2>
              <p className="text-lg text-gray-600 mb-8">
                Máte otázky alebo chcete požiadať o cenovú ponuku? Radi vám pomôžeme.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <MapPinIcon className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Adresa</p>
                    <p className="text-gray-600">{companyInfo.name}</p>
                    <p className="text-gray-600">{companyInfo.address}</p>
                    <p className="text-gray-600">{companyInfo.city}</p>
                    <p className="text-gray-600">{companyInfo.country}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Phone className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Telefón</p>
                    <a href={`tel:${companyInfo.phone}`} className="text-gray-600 hover:text-gray-900 transition-colors">{companyInfo.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Mail className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a href={`mailto:${companyInfo.email}`} className="text-gray-600 hover:text-gray-900 transition-colors">{companyInfo.email}</a>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 space-y-1">
                    <span className="block">IČO: {companyInfo.ico}</span>
                    <span className="block">DIČ: {companyInfo.dic}</span>
                    <span className="block">IČ DPH: {companyInfo.icdph}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Napíšte nám</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Vaše meno"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Váš email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Telefónne číslo"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Vaša správa"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="rounded-xl"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-xl hover-lift"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Odosielanie...' : 'Odoslať správu'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="logo-text text-2xl font-semibold mb-4">
                Fenji <span className="text-gray-400">Slovakia</span>
              </div>
              <p className="text-gray-400 text-sm">
                Profesionálne prepravné služby po celej Európskej únii.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>{companyInfo.phone}</p>
                <p>{companyInfo.email}</p>
                <p>{companyInfo.address}</p>
                <p>{companyInfo.city}, {companyInfo.country}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Identifikačné údaje</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>IČO: {companyInfo.ico}</p>
                <p>DIČ: {companyInfo.dic}</p>
                <p>IČ DPH: {companyInfo.icdph}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} {companyInfo.name}. Všetky práva vyhradené.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;