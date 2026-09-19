/**
 * ECOLIFE HUB - USER INTERFACE & COMPONENT SCRIPTS
 * * Cleaned up structural logic, removed complex/robotic technical terminology from
 * comment blocks, and polished the behavioral components. All system interactions
 * are preserved exactly to keep standard page operations complete.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------------------------
    // I. VIEWPORT LIFE-CYCLE INTERCEPTOR (GLOBAL LOADER)
    // ----------------------------------------------------------------------
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.classList.add('fade-out');
        });
        // Safety Fallback for loading animation
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 1800);
    }

    // ----------------------------------------------------------------------
    // II. THEME CONTROLLER (LIGHT/DARK MECHANICS)
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentThemeMode = localStorage.getItem('ecolife-theme-engine') || 'light';

    // Set initial configuration
    document.documentElement.setAttribute('data-theme', currentThemeMode);
    updateThemeToggleIcon(currentThemeMode);

    themeToggleBtn.addEventListener('click', () => {
        const runtimeActiveTheme = document.documentElement.getAttribute('data-theme');
        const targetThemeMode = runtimeActiveTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', targetThemeMode);
        localStorage.setItem('ecolife-theme-engine', targetThemeMode);
        updateThemeToggleIcon(targetThemeMode);
    });

    function updateThemeToggleIcon(activeMode) {
        const runtimeIconContainer = themeToggleBtn.querySelector('i');
        if (activeMode === 'light') {
            runtimeIconContainer.className = 'fa-solid fa-sun';
        } else {
            runtimeIconContainer.className = 'fa-solid fa-moon';
        }
    }

    // ----------------------------------------------------------------------
    // III. SCROLL PROGRESS & BACK TO TOP BUTTONS
    // ----------------------------------------------------------------------
    const navigationBarNode = document.querySelector('.navbar');
    const scrollIndicatorProgress = document.getElementById('scroll-progress');
    const returnTopNodeButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const totalViewportScrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
        const exactCurrentScrollPosition = window.scrollY;

        // Dynamic Header Scroll Shadow
        if (exactCurrentScrollPosition > 50) {
            navigationBarNode.classList.add('scrolled');
        } else {
            navigationBarNode.classList.remove('scrolled');
        }

        // Top Horizontal Progress Indicator
        if (totalViewportScrollableDistance > 0) {
            const calculatedPercentageVector = (exactCurrentScrollPosition / totalViewportScrollableDistance) * 100;
            scrollIndicatorProgress.style.width = `${calculatedPercentageVector}%`;
        }

        // Back To Top Display Toggle
        if (exactCurrentScrollPosition > 600) {
            returnTopNodeButton.classList.add('show');
        } else {
            returnTopNodeButton.classList.remove('show');
        }
    });

    returnTopNodeButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ----------------------------------------------------------------------
    // IV. MOBILE NAVIGATION DRAWER
    // ----------------------------------------------------------------------
    const structureHamburgerNode = document.querySelector('.hamburger');
    const viewportNavLinksWrapper = document.querySelector('.nav-links');
    const independentLinkArrayNode = document.querySelectorAll('.nav-link');

    structureHamburgerNode.addEventListener('click', () => {
        structureHamburgerNode.classList.toggle('active');
        viewportNavLinksWrapper.classList.toggle('active');
    });

    independentLinkArrayNode.forEach(individualTargetLink => {
        individualTargetLink.addEventListener('click', () => {
            structureHamburgerNode.classList.remove('active');
            viewportNavLinksWrapper.classList.remove('active');
        });
    });

    // Smooth Active Link Tracking
    const crossSectionTargetContainers = document.querySelectorAll('section[id]');
    const systemScrollTrackObserver = new IntersectionObserver((monitoredEntries) => {
        monitoredEntries.forEach(currentEntryNode => {
            if (currentEntryNode.isIntersecting) {
                const targetNodeIdentifier = currentEntryNode.target.getAttribute('id');
                independentLinkArrayNode.forEach(linkElement => {
                    linkElement.classList.remove('active');
                    if (linkElement.getAttribute('href') === `#${targetNodeIdentifier}`) {
                        linkElement.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.35 });

    crossSectionTargetContainers.forEach(individualSectionElement => {
        systemScrollTrackObserver.observe(individualSectionElement);
    });

    // ----------------------------------------------------------------------
    // V. ANIMATED MILESTONE NUMBERS
    // ----------------------------------------------------------------------
    const collectionNumericalStatItems = document.querySelectorAll('.stat-number');
    
    const countTriggerObserver = new IntersectionObserver((observedEntries, targetObserverSelf) => {
        observedEntries.forEach(entry => {
            if (entry.isIntersecting) {
                const preciseNumericTargetNode = entry.target;
                const dynamicCountLimitTarget = parseInt(preciseNumericTargetNode.getAttribute('data-target'), 10);
                let currentIncrementalCounter = 0;
                const computationalTimeStepSpeed = dynamicCountLimitTarget / 100;

                const executeCounterUpdateLoop = () => {
                    currentIncrementalCounter += Math.ceil(computationalTimeStepSpeed);
                    if (currentIncrementalCounter >= dynamicCountLimitTarget) {
                        preciseNumericTargetNode.textContent = dynamicCountLimitTarget.toLocaleString();
                    } else {
                        preciseNumericTargetNode.textContent = Math.ceil(currentIncrementalCounter).toLocaleString();
                        requestAnimationFrame(executeCounterUpdateLoop);
                    }
                };
                
                requestAnimationFrame(executeCounterUpdateLoop);
                targetObserverSelf.unobserve(preciseNumericTargetNode);
            }
        });
    }, { threshold: 0.8 });

    collectionNumericalStatItems.forEach(statNode => countTriggerObserver.observe(statNode));

    // ----------------------------------------------------------------------
    // VI. SEARCH & ECO TIPS CATEGORY FILTERS
    // ----------------------------------------------------------------------
    const coreTipsSearchBarNode = document.getElementById('tips-search');
    const filterTagButtons = document.querySelectorAll('.filter-btn');
    const catalogedTipCardElements = document.querySelectorAll('.tip-card');

    function executeTipsMatrixFilterEvaluation() {
        const rawSearchInputString = coreTipsSearchBarNode.value.toLowerCase().trim();
        const activeFilteringCategoryToken = document.querySelector('.filter-btn.active').getAttribute('data-filter');

        catalogedTipCardElements.forEach(cardNode => {
            const structuralCardCategory = cardNode.getAttribute('data-category');
            const innerTextTitleContent = cardNode.querySelector('h3').textContent.toLowerCase();
            const innerTextBodyContent = cardNode.querySelector('p').textContent.toLowerCase();
            
            const categoryMatchState = (activeFilteringCategoryToken === 'all' || structuralCardCategory === activeFilteringCategoryToken);
            const stringMatchState = (innerTextTitleContent.includes(rawSearchInputString) || innerTextBodyContent.includes(rawSearchInputString));

            if (categoryMatchState && stringMatchState) {
                cardNode.style.display = 'flex';
            } else {
                cardNode.style.display = 'none';
            }
        });
    }

    if (coreTipsSearchBarNode) {
        coreTipsSearchBarNode.addEventListener('input', executeTipsMatrixFilterEvaluation);
    }

    filterTagButtons.forEach(buttonElement => {
        buttonElement.addEventListener('click', () => {
            filterTagButtons.forEach(btn => btn.classList.remove('active'));
            buttonElement.classList.add('active');
            executeTipsMatrixFilterEvaluation();
        });
    });

    // ----------------------------------------------------------------------
    // VII. INTERACTIVE RECYCLING SEARCH INDEX
    // ----------------------------------------------------------------------
    const mainMaterialsSearchBar = document.getElementById('recycle-search');
    const structuredRecycleCardArray = document.querySelectorAll('.recycle-card');

    if (mainMaterialsSearchBar) {
        mainMaterialsSearchBar.addEventListener('input', () => {
            const processingQueryString = mainMaterialsSearchBar.value.toLowerCase().trim();
            
            structuredRecycleCardArray.forEach(recycleCardNode => {
                const analyticalIndexTags = recycleCardNode.getAttribute('data-item').toLowerCase();
                const cardHeaderValue = recycleCardNode.querySelector('h3').textContent.toLowerCase();
                
                if (analyticalIndexTags.includes(processingQueryString) || cardHeaderValue.includes(processingQueryString)) {
                    recycleCardNode.style.display = 'flex';
                } else {
                    recycleCardNode.style.display = 'none';
                }
            });
        });
    }

    // ----------------------------------------------------------------------
    // VIII. CARBON EMISSIONS EVALUATION PIPELINE
    // ----------------------------------------------------------------------
    const internalCarbonFormNode = document.getElementById('footprint-form');
    
    if (internalCarbonFormNode) {
        internalCarbonFormNode.addEventListener('submit', (eventInstantiationObject) => {
            eventInstantiationObject.preventDefault();

            const monthlyElectricityKwh = parseFloat(document.getElementById('calc-electricity').value) || 0;
            const weeklyTransitDistanceMiles = parseFloat(document.getElementById('calc-transport').value) || 0;
            const strategicDietarySelectionToken = document.getElementById('calc-diet').value;

            // Emission factor coefficients
            const electricityCoefficientConstant = 0.000475;
            const transportationCoefficientConstant = 0.000404;
            
            let dietaryCoefficientMatrixWeight = 2.5; 
            if (strategicDietarySelectionToken === 'balanced') dietaryCoefficientMatrixWeight = 1.7;
            if (strategicDietarySelectionToken === 'vegetarian') dietaryCoefficientMatrixWeight = 1.2;
            if (strategicDietarySelectionToken === 'vegan') dietaryCoefficientMatrixWeight = 0.7;

            // Annual output calculations
            const annualElectricityEmissions = monthlyElectricityKwh * 12 * electricityCoefficientConstant;
            const annualTransportationEmissions = weeklyTransitDistanceMiles * 52 * transportationCoefficientConstant;
            const grossSummedCarbonFootprintScore = annualElectricityEmissions + annualTransportationEmissions + dietaryCoefficientMatrixWeight;

            const uiScoreTargetMetric = document.getElementById('score-metric');
            const uiBadgeTargetLabel = document.getElementById('score-badge');
            const uiSuggestionBoxBody = document.getElementById('calc-suggestion');

            // Count Up animation simulation
            let temporaryScoreCounter = 0;
            const targetScorePrecisionLimit = grossSummedCarbonFootprintScore;
            
            const countScoreDisplayLoop = () => {
                temporaryScoreCounter += 0.15;
                if (temporaryScoreCounter >= targetScorePrecisionLimit) {
                    uiScoreTargetMetric.textContent = targetScorePrecisionLimit.toFixed(1);
                } else {
                    uiScoreTargetMetric.textContent = temporaryScoreCounter.toFixed(1);
                    requestAnimationFrame(countScoreDisplayLoop);
                }
            };
            requestAnimationFrame(countScoreDisplayLoop);

            // Classification ranges
            if (grossSummedCarbonFootprintScore <= 3.5) {
                uiBadgeTargetLabel.className = 'badge-optimal';
                uiBadgeTargetLabel.textContent = 'Eco-Warrior Status Verified';
                uiSuggestionBoxBody.textContent = 'Excellent conservation efforts! You have a remarkably small carbon footprint. Keep it up by finding subtle ways to share your sustainable living practices with neighbors.';
            } else if (grossSummedCarbonFootprintScore <= 7.0) {
                uiBadgeTargetLabel.className = 'badge-neutral';
                uiBadgeTargetLabel.textContent = 'Moderate Atmospheric Footprint';
                uiSuggestionBoxBody.textContent = 'Good start! Try reducing single-occupancy commutes and adjusting your thermostat down by just 2 degrees in the winter to significantly shrink your footprint.';
            } else {
                uiBadgeTargetLabel.className = 'badge-warning';
                uiBadgeTargetLabel.textContent = 'Critical Strain Threshold';
                uiSuggestionBoxBody.textContent = 'Your carbon footprint is higher than average. Focus on making incremental changes: switch to LED lights, choose public transit weekly, or scale up vegetarian meals.';
            }
        });
    }

    // ----------------------------------------------------------------------
    // IX. ECO CHALLENGES BADGES & PROGRESS
    // ----------------------------------------------------------------------
    const objectiveActionButtonElements = document.querySelectorAll('.challenge-btn');
    
    objectiveActionButtonElements.forEach(actionButtonNode => {
        actionButtonNode.addEventListener('click', () => {
            const correspondingChallengeCardItem = actionButtonNode.closest('.challenge-item');
            const systemTargetBadgeId = actionButtonNode.getAttribute('data-id');
            
            correspondingChallengeCardItem.classList.add('completed-state');
            actionButtonNode.textContent = 'Objective Captured';
            
            const correspondingSystemBadgeNode = document.getElementById(`badge-${systemTargetBadgeId}`);
            if (correspondingSystemBadgeNode) {
                correspondingSystemBadgeNode.classList.remove('locked');
                correspondingSystemBadgeNode.classList.add('unlocked');
            }
        });
    });

    // ----------------------------------------------------------------------
    // X. FAQS ACCORDION TRIGGERS
    // ----------------------------------------------------------------------
    const activeFaqTriggerHeaders = document.querySelectorAll('.faq-trigger');

    activeFaqTriggerHeaders.forEach(faqHeaderNode => {
        faqHeaderNode.addEventListener('click', () => {
            const coreParentFaqItemContainer = faqHeaderNode.parentElement;
            const targetCollapsibleContentPanel = coreParentFaqItemContainer.querySelector('.faq-content');
            const processingExpansionState = coreParentFaqItemContainer.classList.contains('active');

            // Collapse other items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-content').style.maxHeight = null;
            });

            if (!processingExpansionState) {
                coreParentFaqItemContainer.classList.add('active');
                targetCollapsibleContentPanel.style.maxHeight = `${targetCollapsibleContentPanel.scrollHeight}px`;
            }
        });
    });

    // ----------------------------------------------------------------------
    // XI. SECURE FORM SIMULATIONS (CONTACT & NEWSLETTER)
    // ----------------------------------------------------------------------
    const structuralContactFormNode = document.getElementById('contact-form');
    if (structuralContactFormNode) {
        structuralContactFormNode.addEventListener('submit', (eventRef) => {
            eventRef.preventDefault();
            const originalButtonNode = structuralContactFormNode.querySelector('button[type="submit"]');
            
            originalButtonNode.disabled = true;
            originalButtonNode.textContent = 'Encrypting & Dispatching...';

            setTimeout(() => {
                alert('Thank you! Your message has been safely received by our sustainability team.');
                structuralContactFormNode.reset();
                originalButtonNode.disabled = false;
                originalButtonNode.textContent = 'Send Message';
            }, 1200);
        });
    }

    const simpleNewsletterFormNode = document.getElementById('newsletter-form');
    if (simpleNewsletterFormNode) {
        simpleNewsletterFormNode.addEventListener('submit', (newsletterEventRef) => {
            newsletterEventRef.preventDefault();
            alert('Welcome to our community newsletter! You have successfully joined.');
            simpleNewsletterFormNode.reset();
        });
    }

    // ----------------------------------------------------------------------
    // XII. SCROLL-DRIVEN FADE-IN ANIMATIONS & LAZY LOADING
    // ----------------------------------------------------------------------
    const highEndDynamicFadingElements = document.querySelectorAll('.fade-in');
    
    const standardVisualFadeObserver = new IntersectionObserver((detectedFadingItems, selfReferenceObserver) => {
        detectedFadingItems.forEach(itemEntryNode => {
            if (itemEntryNode.isIntersecting) {
                itemEntryNode.target.classList.add('appear');
                selfReferenceObserver.unobserve(itemEntryNode.target);
            }
        });
    }, { threshold: 0.15 });

    highEndDynamicFadingElements.forEach(fadingNode => standardVisualFadeObserver.observe(fadingNode));

    // Lazy Image Loader
    const catalogedLazyImages = document.querySelectorAll('.lazy-image');
    
    const operationalImageLoadObserver = new IntersectionObserver((trackedImagesCollection, imageObserverSelf) => {
        trackedImagesCollection.forEach(imageEntry => {
            if (imageEntry.isIntersecting) {
                const targetUnresolvedImageNode = imageEntry.target;
                if (targetUnresolvedImageNode.dataset.src) {
                    targetUnresolvedImageNode.src = targetUnresolvedImageNode.dataset.src;
                }
                imageObserverSelf.unobserve(targetUnresolvedImageNode);
            }
        });
    }, { rootMargin: '0px 0px 200px 0px' });

    catalogedLazyImages.forEach(imageNode => operationalImageLoadObserver.observe(imageNode));
});