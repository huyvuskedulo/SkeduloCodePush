//
//  SwiftPluginCall.swift
//  SkeduloCodePush
//
//  Created by Huy Vu on 12/01/2022.
//

import Foundation
import UIKit
import React

@objc
class SwiftPluginCall: NSObject {
    
    public static var sharedController: UIViewController? = nil
    public static var nativeCountData: Int = 0
    
    static func openRNView(rootView: RCTRootView, fromVc: UIViewController) {
        let vc = UIViewController()
        vc.modalPresentationStyle = .fullScreen

        vc.view = rootView
        
        SwiftPluginCall.sharedController = vc;
        
        fromVc.present(vc, animated: true, completion: nil)
    }
    
    @objc
    static func exit() {
        if sharedController == nil {
            return
        }
        
        DispatchQueue.main.sync {
            sharedController?.dismiss(animated: true, completion: nil)
        }
    }
    
    @objc
    static func increaseNativeCount() {
        
        nativeCountData+=1;
        
        DispatchQueue.main.sync {
            ViewController.shared?.updateCount()
        }
    
    }
    
    @objc
    static func callback(data: String) {
        
        JSProcessManager.shared.callBackMethod(result: data)
    
    }
    
}
